import axios from "axios"
import { loadFromStorage, saveToStorage } from "./util.service"

export const youtubeService = {
    getVideoId,
    getCurrSong
}

const YT_KEY = 'AIzaSyBSWt3 - m0mxFxo3zs2yYCRSomPyGt1kRKI'

window.youtubeService = youtubeService

async function getVideoId(search) {
    try {
        let videoId = loadFromStorage(search)

        if (videoId) {   // Load from cache
            console.log('Load from cache')
            console.log(videoId)
            return videoId
        }

        const url = _getUrl(search)
        const res = await axios.get(url) // AJAX req
        console.log('AJAX req')
        videoId = res.data.items[0].id.videoId

        saveToStorage(search, videoId)

        return videoId

    } catch (error) {
        console.log('err:', error)
    }

}

function _getUrl(search) {
    return `https://www.googleapis.com/youtube/v3/search?` +
        `part=snippet&` +
        `videoEmbeddable=true&` +
        `type=video&` +
        `key=${YT_KEY}&q=${search}`
}

async function getCurrSong(track) {
    const song ={
        artist: track.artists[0].name,
        name: track.name,
        youtubeUrl: ''
    }
    
    await getVideoId(`${song.artist} ${song.name}`).then(res => song.youtubeUrl = res)

    console.log(song)
    return song
}
