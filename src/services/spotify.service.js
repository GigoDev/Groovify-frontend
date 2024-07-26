import axios from 'axios'
import { saveToStorage, loadFromStorage, formatTime } from './util.service'
import { stationService } from './station'

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

getTracks('faith')

async function getTracks(searchQuery) {
    try {

        // From storage:
        const queries = loadFromStorage(STORAGE_KEY) || {}
        if (queries[searchQuery]) return queries[searchQuery]

        // From spotify
        const token = loadFromStorage('access_token')
        const headers = { 'Authorization': `Bearer ${token}` }
        const url = `https://api.spotify.com/v1/search?q=${searchQuery}&type=track&limit=5`

        const res = await axios.get(url, { headers })

        let tracks = res.data.tracks.items //  TODO:  format res to our station.tracks
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

async function getArtist(artistId) {
    var artist
    //local storage
    try {
        const stations = await loadFromStorage('station')
        artist = stations.find(station => station.id === artistId)
        if (artist) {
            console.log('from local storage', artist)
            return artist
        }
    } catch (error) {
        console.log('cant find id in cache, getting playlist from spotify')
    }

    //from spotify
    try {
        const token = loadFromStorage('access_token')
        const url = `https://api.spotify.com/v1/artists/${artistId}`;
        const headers = { 'Authorization': `Bearer ${token}` }
        const [resp, topTracks] = await Promise.all([axios.get(url, { headers }), _getArtistTopTracks(artistId)])

        artist = {
            type: resp.data.type,
            id: resp.data.id,
            name: resp.data.name,
            imgs: resp.data.images,
            listeners: resp.data.followers.total,
        }
        artist.tracks = topTracks

        console.log(artist)
        return artist

    } catch (error) {
        console.error('Error fetching artist from spotify:', error)
    }

}

async function _getArtistTopTracks(artistId, market = 'IL') {
    try {
        const token = loadFromStorage('access_token')
        const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=${market}`;
        const headers = { 'Authorization': `Bearer ${token}` }
        const resp = await axios.get(url, { headers })

        const tracks = resp.data.tracks.map(track => ({
            id: track.id,
            name: track.name,
            duration: formatTime(track.duration_ms / 1000),
            artist: { id: track.artists[0].id, name: track.artists[0].name },
            album: { id: track.album.id, name: track.album.name, totalTrack: track.album.total_tracks, imgs: track.album.images }
        }))

        // console.log(tracks)
        return tracks

    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error fetching artist tracks:', error)
    }
}

async function getPlaylist(playlistId) {
    //localStorage
    var playlist
    try {
        const stations = await loadFromStorage('station')
        playlist = stations.find(station => station.id === playlistId)
        if (playlist) {
            console.log('from local storage', playlist)
            return playlist
        }
    } catch (error) {
        console.log('cant find id in cache, getting playlist from spotify')
    }
    //sporify
    try {
        const token = loadFromStorage('access_token')
        const fields = 'description,followers,href,id,images,name,type,followers,tracks(href,total,items())'
        const url = `https://api.spotify.com/v1/playlists/${playlistId}?fields=${fields}`
        const headers = { 'Authorization': `Bearer ${token}` }
        const resp = await axios.get(url, { headers })

        const items = resp.data.tracks.items
        playlist = {
            id: resp.data.id,
            type: resp.data.type,
            name: resp.data.name,
            description: resp.data.description,
            imgs: resp.data.images,
            likes: resp.data.followers.total,
            total: resp.data.tracks.total,
            tracks: items.map(item => ({
                id: item.track.id,
                type: item.track.type,
                name: item.track.name,
                album: { name: item.track.album.name, id: item.track.album.id, totalTracks: item.track.album.total_tracks, imgs: item.track.album.images },
                artist: { id: item.track.artists[0].id, name: item.track.artists[0].name },
                duration: formatTime(item.track.duration_ms / 1000),
                addedAt: item.added_at
            }))
        }

        console.log(playlist)
        return playlist

    } catch (error) {
        console.error('Error fetching playlist from spotify:', error)
    }
}

async function getAlbum(albumId, market = 'IL') {
    var album
    //from local storage
    try {
        const stations = await loadFromStorage('station')
        album = stations.find(station => station.id === albumId)
        if (album) {
            console.log('from local storage', album)
            return album
        }

    } catch (error) {
        console.log('cant find id in cache, getting playlist from spotify')
    }

    //from spotify
    try {
        const token = loadFromStorage('access_token')
        const url = `https://api.spotify.com/v1/albums/${albumId}?market=${market}`
        const headers = { 'Authorization': `Bearer ${token}` }
        const resp = await axios.get(url, { headers })
        console.log(resp.data)
        album = {
            spotifyId: resp.data.id,
            type: resp.data.type,
            name: resp.data.name,
            imgs: resp.data.images,
            total: resp.data.tracks.total, // the number of tracks in the album
            releaseDate: resp.data.release_date,
            artist: { id: resp.data.artists[0].id, name: resp.data.artists[0].name },
            tracks: resp.data.tracks.items.map(item => ({
                spotifyId: item.id,
                name: item.name,
                duration: item.duration_ms,
                artist: { id: item.artists[0].id, name: item.artists[0].name },
                addedAt: null,
            })),
            listeners: null,
            description: null,
            likes: null,
            owner: null,

        }
        console.log(album)
        return album

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
        id: playlist.id,
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
            id: track.id,
            name: track.name,
            type: track.type,
            duration: formatTime(track.duration_ms / 1000),
            album: { id: track.album.id, name: track.album.name, imgs: track.album.images, artist: { id: track.album.artists[0].id, name: track.album.artists[0].name } },
            artists: track.artists.map(artist => ({ id: artist.id, name: artist.name, }))

        }))
        console.log(tracks)
    } catch (error) {
        console.error('Error in searching:', error)
    }
}

async function _getAlbumTracks(id, limit = 10, offset = 0, market = 'IL') {
    const token = loadFromStorage('access_token')
    try {
        // const url = `https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks`;
        const url = `https://api.spotify.com/v1/albums/${id}/tracks?market=${market}&limit=${limit}&offset=${offset}`

        const headers = { 'Authorization': `Bearer ${token}` }

        const resp = await axios.get(url, { headers })

        console.log(resp.data.items)
    } catch (error) {
        console.error('Error fetching album tracks:', error)
    }
}

async function getAlbums(ids = ['382ObEPsp2rxGrnsizN5TX', '2C1A2GTWGtFfWp7KSQTwWOyo', '2C2noRn2Aes5aoNVsU6iWThc']) {
    const token = loadFromStorage('access_token')
    const idString = ids.join('%')
    try {
        const url = `https://api.spotify.com/v1/albums?ids=${idString}`

        const headers = { 'Authorization': `Bearer ${token}` }

        const resp = await axios.get(url, { headers })

        console.log(resp.data)

    } catch (error) {
        console.error('Error fetching albums:', error)
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
            id: playlist.id,
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
            id: track.id,
            name: track.name
        }))

        console.log(topTracks)


    } catch (error) {
        console.error('Error in getting top tracks:', error)
    }
}


