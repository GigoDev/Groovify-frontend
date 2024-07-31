import axios from "axios"
import { loadFromStorage, saveToStorage } from "./util.service"

export const youtubeService = {
    getTrackId,
    
}
const STORAGE_KEY = 'youtube_DB'
const YT_KEY = 'AIzaSyCilqLL-8Izy6Fx59c3SKshxQkbcSnuG5I'

window.youtubeService = youtubeService

async function getTrackId(trackToFind) {
    try {
        const tracks = loadFromStorage(STORAGE_KEY) || []
        let track = tracks.find(currTrack => currTrack.name === trackToFind.name)
        if (track) return track

        const url = _getUrl(`${trackToFind.artist.name} - ${trackToFind.name}`)
        const res = await axios.get(url)
        track = {
            ...trackToFind,
            youtubeId: res.data.items[0].id.videoId
        }
        tracks.push(track)
        saveToStorage(STORAGE_KEY, tracks)
        return track

    } catch (error) {
        console.log('err:', error)
    }

}

function _getUrl(trackName) {
    return `https://www.googleapis.com/youtube/v3/search?` +
        `part=snippet&` +
        `videoEmbeddable=true&` +
        `type=video&` +
        `key=${YT_KEY}&q=${trackName}`
}

