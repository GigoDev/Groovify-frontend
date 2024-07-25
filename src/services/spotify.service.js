import axios from 'axios'
import { saveToStorage, loadFromStorage, formatTime, makeId } from './util.service'

const CLIENT_ID = '1c050b057d7c4a9d89225fabe0c0bed7'
const CLIENT_SECRET = '798827575dda46239866dc3c071fcfc1'

export const spotifyService = {
    getToken,
    getArtist,
    getPlaylist,
    getAlbum,
    getCategoryPlaylists,
    searchFor,
    getFeaturedPlaylists,
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

async function getArtist(stationId) {//refactored
    var station
    //local storage
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
        const url = `https://api.spotify.com/v1/artists/${stationId}`;
        const headers = { 'Authorization': `Bearer ${token}` }
        const [resp, topTracks] = await Promise.all([axios.get(url, { headers }), _getArtistTopTracks(stationId)])

        station = _getEmptyStation()
        station._id = makeId()
        station.type = resp.data.type
        station.spotifyId = resp.data.id
        station.name = resp.data.name
        station.listeners = resp.data.followers.total
        station.imgs = resp.data.images
        station.tracks = topTracks
        console.log(station)
        return station

    } catch (error) {
        console.error('Error fetching artist from spotify:', error)
    }

}

async function getPlaylist(stationId) {//refactored
    //localStorage
    var station
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
    // sporify
    try {
        const token = loadFromStorage('access_token')
        const fields = 'description,followers,href,id,images,name,type,followers,tracks(href,total,items())'
        const url = `https://api.spotify.com/v1/playlists/${stationId}?fields=${fields}`
        const headers = { 'Authorization': `Bearer ${token}` }
        const resp = await axios.get(url, { headers })

        const items = resp.data.tracks.items

        station = _getEmptyStation()
        station._id = makeId()
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

        console.log(station)
        return station

    } catch (error) {
        console.error('Error fetching playlist from spotify:', error)
    }
}

async function getAlbum(stationId, market = 'US') {//refactored
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
        // console.log(resp.data)
        station = _getEmptyStation()
        station._id = makeId()
        station.type = resp.data.type
        station.spotifyId = resp.data.id
        station.name = resp.data.name
        station.imgs = resp.data.images
        station.total = resp.data.tracks.total //total tracks in the album
        station.releaseDate = resp.data.release_date //album release date
        station.artist = { spotifyId: resp.data.artists[0].id, name: resp.data.artists[0].name }
        station.tracks = resp.data.tracks.items.map(item => ({
            spotifyId: item.id,
            name: item.name,
            duration: item.duration_ms,
            artist: { spotifyId: item.artists[0].id, name: item.artists[0].name },
            album: {spotifyId: resp.data.id, name: resp.data.name, imgs: resp.data.images},
            addedAt: null,
        }))

        console.log(station)
        return station

    } catch (error) {
        console.error('Error fetching album from spotify:', error)
    }
}

async function getCategoryPlaylists(category) {

    const token = loadFromStorage('access_token')
    const url = `https://api.spotify.com/v1/browse/categories/${category}/playlists`
    const headers = { 'Authorization': `Bearer ${token}` }
    const resp = await axios.get(url, { headers })
    console.log(resp)
    const playlists = resp.data.playlists.items.map(playlist => ({
        spotifyId: playlist.id,
        type: playlist.type,
        name: playlist.name,
        description: playlist.description,
        imgs: playlist.images,
        owner: { id: playlist.owner.id, name: playlist.owner.display_name },
        category: category

    }))

    console.log('playlists:', playlists)
    return playlists

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
            name: track.name,
            type: track.type,
            duration: formatTime(track.duration_ms / 1000),
            album: { spotifyId: track.album.id, name: track.album.name, imgs: track.album.images, artist: { spotifyId: track.album.artists[0].id, name: track.album.artists[0].name } },
            artists: track.artists.map(artist => ({ spotifyId: artist.id, name: artist.name, }))

        }))
        console.log(tracks)
    } catch (error) {
        console.error('Error in searching:', error)
    }
}

async function getFeaturedPlaylists() {//get top 10 playlists in IL

    try {
        const token = loadFromStorage('access_token')
        const url = `https://api.spotify.com/v1/browse/featured-playlists?locale=EN`
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













async function getRecommendationsByArtist(seed_artist, limit = 10) {
    try {
        const token = loadFromStorage('access_token')
        const url = `https://api.spotify.com/v1/recommendations?limit=${limit}&seed_artists=${seed_artist}`
        const headers = { 'Authorization': `Bearer ${token}` }
        const resp = await axios.get(url, { headers })
        console.log(resp.data.tracks)

    } catch (error) {
        console.error('Error getting recommendations by artist:', error)
    }
}

async function getRecommendationsByGeners(geners, limit = 10, market = 'IL') {

    try {
        const token = loadFromStorage('access_token')
        const genersStr = geners.join('%2C')
        const url = `https://api.spotify.com/v1/recommendations?limit=${limit}&market=${market}&seed_genres=${genersStr}`
        const headers = { 'Authorization': `Bearer ${token}` }
        const resp = await axios.get(url, { headers })

        console.log(resp.data.tracks)

    } catch (error) {
        console.error('Error getting recommendations by geners:', error)
    }
}

async function getRecommendationTopTracks(limit = '10') {
    try {
        const token = loadFromStorage('access_token')
        const url = `https://api.spotify.com/v1/recommendations?limit=${limit}&market=IL&seed_genres=pop%2Crock%2Ccountry%2Chip-hop&min_popularity=80&max_popularity=100`
        const headers = { 'Authorization': `Bearer ${token}` }
        const resp = await axios.get(url, { headers })
        const topTracks = resp.data.tracks.map(track => ({
            artist: track.artists[0],
            spotifyId: track.id,
            name: track.name
        }))

        console.log(topTracks)


    } catch (error) {
        console.error('Error in getting top tracks:', error)
    }
}
