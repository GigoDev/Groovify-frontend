import { loadFromStorage, saveToStorage } from "./util.service"
import { httpService } from "./http.service"

export const youtubeService = {
    getTrackId,

}
const STORAGE_KEY = 'youtube_DB'

window.youtubeService = youtubeService

async function getTrackId(trackToFind) {
    try {
        const tracks = loadFromStorage(STORAGE_KEY) || []
        let track = tracks.find(currTrack => currTrack.spotifyId === trackToFind.spotifyId)
        if (track) return track

        const trackName = `${trackToFind.artist.name} - ${trackToFind.name}`
        const id = await httpService.get(`youtube/${trackName}`)
        
        track = {
            ...trackToFind,
            youtubeId: id
        }
        tracks.push(track)
        saveToStorage(STORAGE_KEY, tracks)
        return track

    } catch (error) {
        console.log('err:', error)
    }

}

