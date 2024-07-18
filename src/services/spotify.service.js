import axios from 'axios'
import { saveToStorage, loadFromStorage } from './util.service'



//mini list -  thumbnail, Station name
// const TOKEN = "BQCwnNRQ5-5eZRfOkiPEAv0p4Q6MjsZAs7hnesNH55DkCHkVyiWm3TRbTA0kW2ijWEWEB6-bSzQSalB0uTIprmpjkF-SEIAwtHPbRLWjOR2fTXXT2vE"
const CLIENT_ID = '1c050b057d7c4a9d89225fabe0c0bed7'
const CLIENT_SECRET = '798827575dda46239866dc3c071fcfc1'

export const spotifyService = {
    getToken,
    getArtist,
    getAlbum,
    getAlbums,
    getAlbumTracks,
    getRecommendationsByArtist,
    getRecommendationsByGeners,
    searchFor,
    getUserTopItems,
}

window.spotifyService = spotifyService

if (!loadFromStorage('access_token')) getToken()

// getToken()
async function getToken() {
    const url = 'https://accounts.spotify.com/api/token'

    const data = {
        'client_id': CLIENT_ID,
        'grant_type': 'client_credentials',
        'client_secret': CLIENT_SECRET,
    }

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    try {
        const resp = await axios.post(url, data, { headers })
        console.log(resp)
        // console.log(resp.data)
        console.log('access token: ', resp.data.access_token)
        saveToStorage('access_token', resp.data.access_token)

    } catch (error) {
        console.error('Error fetching token:', error)
    }

}

//getArtist()
async function getArtist() {
    const token = loadFromStorage('access_token')
    try {
        const url = `https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg`;

        // Define headers correctly
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        // Make the GET request with axios
        const resp = await axios.get(url, { headers })

        // Log the response data
        console.log(resp.data)

    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error fetching artist:', error)
    }
}

// getAlbum()
async function getAlbum(id = '4aawyAB9vmqN3uQ7FjRGTy', market = 'IL') {
    const token = loadFromStorage('access_token')
    try {
        // const url = `https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy`
        const url = `https://api.spotify.com/v1/albums/${id}?market=${market}`

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        // Make the GET request with axios
        const resp = await axios.get(url, { headers })

        // Log the response data
        console.log(resp.data)
        console.log('album name:', resp.data.name)
        console.log('tracks:', resp.data.tracks.items)

    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error fetching album:', error)
    }
}


// getAlbumTracks()
async function getAlbumTracks(id = '4aawyAB9vmqN3uQ7FjRGTy', limit = 10, offset = 0, market = 'IL') {
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

// getAlbums()
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


// getRecommendationsByArtist()
async function getRecommendationsByArtist(seed_artist = '4NHQUGzhtTLFvgF5SZesLK', limit = 10) {
    const token = loadFromStorage('access_token')
    try {

        const url = `https://api.spotify.com/v1/recommendations?limit=${limit}&seed_artists=${seed_artist}`

        const headers = { 'Authorization': `Bearer ${token}` }

        const resp = await axios.get(url, { headers })
        // console.log(resp.data)
        console.log(resp.data.tracks)

    } catch (error) {
        console.error('Error getting recommendations by artist:', error)
    }
}

// getRecommendationsByGeners()
async function getRecommendationsByGeners(geners = ['classical', 'country'], limit = 10, market = 'IL') {
    const token = loadFromStorage('access_token')
    const genersStr = geners.join('%2C')

    try {
        const url = `https://api.spotify.com/v1/recommendations?limit=${limit}&market=${market}&seed_genres=${genersStr}`

        const headers = { 'Authorization': `Bearer ${token}` }

        const resp = await axios.get(url, { headers })

        // console.log(resp.data)
        console.log(resp.data.tracks)

    } catch (error) {
        console.error('Error getting recommendations by geners:', error)
    }
}
//type values: "album", "artist", "playlist", "track", "show", "episode", "audiobook"
//for example: q=abacab&type=album,track returns both albums and tracks matching "abacab".
// searchFor()
async function searchFor(searchStr = 'coldplay', types = ["track", "album"], limit = 10, market = 'IL') {
    const typesStr = types.join('%2C')

    const token = loadFromStorage('access_token')
    try {
        const url = `https://api.spotify.com/v1/search?q=${searchStr}&type=${typesStr}&market=${market}&limit=${limit}`

        const headers = { 'Authorization': `Bearer ${token}` }

        const resp = await axios.get(url, { headers })
        // console.log(resp.data)
        console.log(resp.data.albums.items)
        console.log(resp.data.tracks.items)

    } catch (error) {
        console.error('Error in searching:', error)
    }
}


