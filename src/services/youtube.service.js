import axios from "axios"
import { loadFromStorage, saveToStorage } from "./util.service"

export const youtubeService = {
    getTrackId,
    getTracks,
}
const YOUTUBE_DB = 'youtube_DB'
const STORAGE_KEY = 'tracks_DB'
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

export async function getTracks(searchVal) {
    const itemMap = loadFromStorage(YOUTUBE_DB) || {}
	if (itemMap[searchVal]) {
	  return Promise.resolve(itemMap[searchVal])
	}
  
	const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&videoEmbeddable=true&type=video&key=${import.meta.env.VITE_YT_API_KEY}&q=${searchVal}`;
  
	try {
	  const res = await axios.get(url)
	  let tracks = res.data.items
  
	  tracks = await Promise.all(tracks.map(track => getVideoDetails(track)))
  
	  itemMap[searchVal] = tracks
	  saveToStorage(YOUTUBE_DB, itemMap)
  
	  return tracks
	} catch (error) {
	  console.error('Error fetching videos:', error);
	  throw error
	}
  }

export function getVideoDetails(track) {
	
	const { id, snippet } = track
	const { title, thumbnails } = snippet
	const videoId = id.videoId
	const thumbnail = thumbnails.default.url
	return { videoId, title, thumbnail }
}
