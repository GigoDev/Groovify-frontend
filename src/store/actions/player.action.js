import { store } from '../store.js'
import { IS_PLAYING, SET_CURR_TRACK } from "../reducers/player.reducer.js"
import { youtubeService } from '../../services/youtube.service.js'

export async function togglePlay(isPlaying = true) {
  try {
    console.log(isPlaying)
    store.dispatch(getActionIsPlaying(isPlaying))
  } catch (err) {
    console.log('cannot play/pause', err)
    throw err
  }
}

export async function setTrack(track) {
  try {
    const newTrack = await youtubeService.getTrackId(track)
    store.dispatch(getActionSetTrack(newTrack))
  } catch (err) {
    console.log('cannot play/pause', err)
    throw err
  }
}



// CMDs Creators:
export function getActionIsPlaying(isPlaying) {
  return {
    type: IS_PLAYING,
    isPlaying
  }
}

export function getActionSetTrack(track) {
  return {
    type: SET_CURR_TRACK,
    currTrack: track
  }
}
