import axios from 'axios'
import { saveToStorage, loadFromStorage, formatTime } from './util.service'

const CLIENT_ID = '1c050b057d7c4a9d89225fabe0c0bed7'
const CLIENT_SECRET = '798827575dda46239866dc3c071fcfc1'
const STORAGE_KEY = 'tracks_search_DB'


export const spotifyService = {
    getToken,
    getArtist,
    getPlaylist,
    getAlbum,
    getCategoryPlaylists,
    searchFor,
    getFeaturedPlaylists,
    getTracks
}

window.spotifyService = spotifyService

if (!loadFromStorage('access_token')) getToken()

async function getToken() {

    const url = 'https://accounts.spotify.com/api/token'
    const data = {
        'client_id': CLIENT_ID,
        'grant_type': 'client_credentials',
        'client_secret': CLIENT_SECRET,
    }
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

    try {
        const resp = await axios.post(url, data, { headers })
        saveToStorage('access_token', resp.data.access_token)

    } catch (error) {
        console.error('Error fetching token:', error)
    }

}

async function getTracks(searchQuery) {
    try {

        // From storage:
        const queries = loadFromStorage(STORAGE_KEY) || {}
        if (queries[searchQuery]) return queries[searchQuery]

        // From spotify
        const token = loadFromStorage('access_token')
        const headers = { 'Authorization': `Bearer ${token}` }
        const url = `https://api.spotify.com/v1/search?q=${searchQuery}&type=track&limit=10`

        const res = await axios.get(url, { headers })

        let tracks = res.data.tracks.items
        tracks = tracks.map(track => _getTrackDetails(track))

        queries[searchQuery] = tracks
        saveToStorage(STORAGE_KEY, queries)
        return tracks

    } catch (error) {
        console.log(error)
    }
}

function _getTrackDetails(track) {
    const { name, id, album, artists, duration_ms } = track
    return {
        spotifyId: id,
        addedAt: Date.now(),
        name,
        duration: formatTime(duration_ms / 1000),
        artist: {
            spotifyId: artists[0].id,
            name: artists[0].name
        },
        album: {
            spotifyId: album.id,
            name: album.name,
            imgs: album.images
        }
    }
}

async function getArtist(stationId) {
    try {
        const token = loadFromStorage('access_token')
        const url = `https://api.spotify.com/v1/artists/${stationId}`;
        const headers = { 'Authorization': `Bearer ${token}` }
        const [resp, topTracks] = await Promise.all([axios.get(url, { headers }), _getArtistTopTracks(stationId)])

        const station = _getEmptyStation()
        station.type = resp.data.type
        station.spotifyId = resp.data.id
        station.name = resp.data.name
        station.listeners = resp.data.followers.total
        station.imgs = resp.data.images
        station.tracks = topTracks
        return station

    } catch (error) {
        if (error.response.status === 403) {
            console.log('token refresh')
            await getToken()
            return await getArtist(stationId)
        } else console.error('Error fetching artist from spotify:', error)
    }
}

async function getPlaylist(stationId) {
    try {
        const token = loadFromStorage('access_token')
        const fields = 'description,followers,href,id,images,name,type,followers,tracks(href,total,items())'
        const url = `https://api.spotify.com/v1/playlists/${stationId}?fields=${fields}`
        const headers = { 'Authorization': `Bearer ${token}` }
        const resp = await axios.get(url, { headers })
        const items = resp.data.tracks.items

        const station = _getEmptyStation()
        station.type = resp.data.type
        station.spotifyId = resp.data.id
        station.name = resp.data.name
        station.description = resp.data.description
        station.likes = resp.data.followers.total
        station.total = resp.data.tracks.total
        station.imgs = resp.data.images
        station.tracks = items.map(item => ({
            spotifyId: item.track.id,
            addedAt: item.added_at,
            name: item.track.name,
            duration: formatTime(item.track.duration_ms / 1000),
            artist: { spotifyId: item.track.artists[0].id, name: item.track.artists[0].name },
            album: { spotifyId: item.track.album.id, name: item.track.album.name, imgs: item.track.album.images },
        }))

        return station

    } catch (error) {
        if (error.response.status === 403) {
            console.log('token refresh')
            await getToken()
            return await getPlaylist(stationId)
        } else console.error('Error fetching playlist from spotify:', error) 
    }
}

async function getAlbum(stationId, market = 'US') {//in Dev
    var station
    //from local storage
    try {
        const stations = await loadFromStorage('station')
        station = stations.find(item => item._id === stationId)
        if (station) {
            console.log('from local storage', station)
            return station
        }

    } catch (error) {
        console.log('cant find id in cache, getting playlist from spotify')
    }

    //from spotify
    try {
        const token = loadFromStorage('access_token')
        const url = `https://api.spotify.com/v1/albums/${stationId}?market=${market}`
        const headers = { 'Authorization': `Bearer ${token}` }
        const resp = await axios.get(url, { headers })

        station = _getEmptyStation()
        station.type = resp.data.type
        station.spotifyId = resp.data.id
        station.name = resp.data.name
        station.imgs = resp.data.images
        station.total = resp.data.tracks.total
        station.releaseDate = resp.data.release_date
        station.artist = { spotifyId: resp.data.artists[0].id, name: resp.data.artists[0].name }
        station.tracks = resp.data.tracks.items.map(item => ({
            spotifyId: item.id,
            name: item.name,
            duration: item.duration_ms,
            artist: { spotifyId: item.artists[0].id, name: item.artists[0].name },
            album: { spotifyId: resp.data.id, name: resp.data.name, imgs: resp.data.images },
            addedAt: null,
        }))

        // console.log(station)
        return station

    } catch (error) {
        console.error('Error fetching album from spotify:', error)
    }
}

async function getCategoryPlaylists(category) {
    try {
        const lowerCaseCategory = category.toLowerCase()
        const token = loadFromStorage('access_token')
        const url = `https://api.spotify.com/v1/browse/categories/${lowerCaseCategory}/playlists?limit=30`
        const headers = { 'Authorization': `Bearer ${token}` }
        const resp = await axios.get(url, { headers })
        console.log(resp)
        const playlists = resp.data.playlists.items.map(playlist => {
            const station = _getEmptyStation()
            station.spotifyId = playlist.id
            station.type = playlist.type
            station.name = playlist.name
            station.description = playlist.description
            station.imgs = playlist.images
            station.owner = { id: playlist.owner.id, name: playlist.owner.display_name }
            station.category = category.toLowerCase()
            return station
        })
        return playlists

    } catch (error) {
        if (error.response.status === 403) {
            console.log('token refresh')
            await getToken()
            return await getCategoryPlaylists(category)
        }
        else console.log('error fetching category playlist', error)
    }

}

async function searchFor(searchStr, types = ["track"], limit = 10, market = 'IL') {//type values: "album", "artist", "playlist", "track"

    try {
        const typesStr = types.join('%2C')
        const token = loadFromStorage('access_token')
        const url = `https://api.spotify.com/v1/search?q=${searchStr}&type=${typesStr}&market=${market}&limit=${limit}`
        const headers = { 'Authorization': `Bearer ${token}` }
        const resp = await axios.get(url, { headers })

        const tracks = resp.data.tracks.items.map(track => ({
            spotifyId: track.id,
            type: track.type,
            name: track.name,
            duration: formatTime(track.duration_ms / 1000),
            album: { spotifyId: track.album.id, name: track.album.name, imgs: track.album.images, artist: { spotifyId: track.album.artists[0].id, name: track.album.artists[0].name } },
            artists: track.artists.map(artist => ({ spotifyId: artist.id, name: artist.name, })),
            addedAt: null,

        }))
        console.log(tracks)
    } catch (error) {
        console.error('Error in searching:', error)
    }
}

async function getFeaturedPlaylists() {//get top 10 playlists in IL
    try {
        const token = loadFromStorage('access_token')
        const url = `https://api.spotify.com/v1/browse/featured-playlists?locale=EN&limit=50`
        const headers = { 'Authorization': `Bearer ${token}` }
        const resp = await axios.get(url, { headers })

        const playlists = resp.data.playlists.items
        const featuredPlaylists = playlists.map(playlist => ({
            spotifyId: playlist.id,
            type: playlist.type,
            name: playlist.name,
            description: playlist.description,
            imgs: playlist.images,
            total: playlist.tracks.total
        }))

        console.log(featuredPlaylists)
        return featuredPlaylists

    } catch (error) {
        console.error('Error in fetching featured playlists:', error)
    }

}

async function _getArtistTopTracks(artistId, market = 'IL') {//refactored
    try {
        const token = loadFromStorage('access_token')
        const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=${market}`;
        const headers = { 'Authorization': `Bearer ${token}` }
        const resp = await axios.get(url, { headers })

        const tracks = resp.data.tracks.map(track => ({
            spotifyId: track.id,
            addedAt: null,
            name: track.name,
            duration: formatTime(track.duration_ms / 1000),
            artist: { spotifyId: track.artists[0].id, name: track.artists[0].name },
            album: { spotifyId: track.album.id, name: track.album.name, imgs: track.album.images }
        }))

        return tracks

    } catch (error) {
        console.error('Error fetching artist tracks:', error)
    }
}

function _getEmptyStation() {
    return ({
        type: null, //all
        spotifyId: null, //all
        name: null, //all
        listeners: null, //artist
        description: null, // playlist
        likes: null, // playlist
        owner: null, //all
        total: null, //playlist , album
        releaseDate: null, //album
        imgs: null, //all
        tracks: null //all
    })
}

