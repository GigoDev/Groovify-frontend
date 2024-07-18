import axios from 'axios'
import { saveToStorage, loadFromStorage } from './util.service'



//mini list -  thumbnail, Station name
const CLIENT_ID = '1c050b057d7c4a9d89225fabe0c0bed7'
const CLIENT_SECRET = '798827575dda46239866dc3c071fcfc1'

export const spotifyService = {
    getToken,
    getArtist,
    getArtistTopTracks,
    getAlbum,
    getAlbumTracks,
    getAlbums,
    getRecommendationsByArtist,
    getRecommendationsByGeners,
    getRecommendationTopTracks,
    searchFor,
    getPopularArtists,
    getFeaturedPlaylists,
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
async function getArtist(id = '0TnOYISbd1XYRBk9myaseg') {
    const token = loadFromStorage('access_token')
    try {
        const url = `https://api.spotify.com/v1/artists/${id}`;

        // Define headers correctly
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        // Make the GET request with axios
        const resp = await axios.get(url, { headers })

        // Log the response data
        console.log(resp.data)

        const station = {
            type: resp.data.type,
            name: resp.data.name,
            imgs: resp.data.images,
            listeners: resp.data.followers.total,
            id: resp.data.id,
            tracks: [//map all tracks to this format
                {
                    id: resp.data.tracks.items[0].id,
                    name: resp.data.tracks.items[0].name,
                    img: resp.data.images
                }]
        }
        console.log(station)

    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error fetching artist:', error)
    }
}

async function getArtistTopTracks(id = '1IAEef07H0fd9aA8aUHUlL', market = 'IL') {
    const token = loadFromStorage('access_token')
    try {
        const url = `https://api.spotify.com/v1/artists/${id}/top-tracks?market=${market}`;

        // Define headers correctly
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        // Make the GET request with axios
        const resp = await axios.get(url, { headers })

        // Log the response data
        console.log(resp.data)

        const station = [{// tracks list

            id: resp.data[0].id,
            name: resp.data[0].name,
            artist: resp.data[0].artists[0]
        }]
        console.log(station)

    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error fetching artist tracks:', error)
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
        console.log(resp.data) // album
        console.log('album name:', resp.data.name)
        console.log('tracks:', resp.data.tracks.items)

        const station = {
            type: resp.data.album_type,
            name: resp.data.name,
            imgs: resp.data.images,
            id: resp.data.id,
            tracks: [//map all tracks to this format
                {
                    id: resp.data.tracks.items[0].id,
                    name: resp.data.tracks.items[0].name,
                    img: resp.data.images
                }]
        }
        console.log(station)

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

async function getRecommendationTopTracks(limit = '10') {
    const token = loadFromStorage('access_token')
    try {
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

//get top 10 playlists in IL
async function getFeaturedPlaylists() {
    var featuredPlaylists = loadFromStorage('featuredPlaylists')
    if(featuredPlaylists) {
        console.log('from storage:',featuredPlaylists)
        return featuredPlaylists
    }
   

    try {
        const token = loadFromStorage('access_token')
        const url = `https://api.spotify.com/v1/browse/featured-playlists?limit=10`
        const headers = { 'Authorization': `Bearer ${token}` }
        const resp = await axios.get(url, { headers })

        const items = resp.data.playlists.items
        featuredPlaylists = items.map(item => ({
            id: item.id,
            imgs: item.images,
            name: item.name,
            description: item.description,
            tracksUrl: item.tracks.href,
            total: item.tracks.total
        }))

        console.log(featuredPlaylists)
        saveToStorage('featuredPlaylists',featuredPlaylists)

    } catch (error) {
        console.error('Error in searching:', error)
    }

}

// get a list of popular artists
async function getPopularArtists() {
    var popularArtists = loadFromStorage('popularArtists')

    if(popularArtists) {
        console.log('from storage:',popularArtists)
        return popularArtists
    }

    const token = loadFromStorage('access_token')
    const Artists = ['1IAEef07H0fd9aA8aUHUlL', '17pbOSPIn3lmY0vHhOlKGL', '17pbOSPIn3lmY0vHhOlKGL', '6uQl3gu1AIXyvqCAxnc2q4', '6VdxGMRiiFQhI8F0FkuQZg', '2JQK9mzxqKz16lSgICHDTx', '4gzpq5DPGxSnKTe4SA8HAU', '5Ea0d3mUECVaMf8h2DTehE', '6qqNVTkY8uBg9cP3Jd7DAH', '343YYaA5MSjiZZ5cGyTr4u', '1CD5WWtF6AFUq6BTY20I4k', '3cDi1D2FHMVgljfdB1QVgr'].join(',')
    const url = `https://api.spotify.com/v1/artists?ids=${Artists}`
    const headers = { 'Authorization': `Bearer ${token}` }

    try{
        const resp = await axios.get(url, { headers })
        console.log(resp.data)
        popularArtists = resp.data.artists.map(artist => ({
            id: artist.id,
            name: artist.name,
            followers: artist.followers,
            imgs: artist.images,
            artistUrl: artist.href
        }))
        console.log(popularArtists)
        saveToStorage('popularArtists',popularArtists)
    }
    catch(error){
        console.error('Error in fetching popular artists:', error)
    }
  
}



