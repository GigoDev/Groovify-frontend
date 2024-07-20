import { store } from '../store.js'
import { SET_CURR_SONG_IDX, IS_PLAYING, SET_CURR_STATION_IDX } from "../reducers/player.reducer.js"

// Action Creators:
export function getActionCurrSongIdx(currSongIdx) {
  return {
    type: SET_CURR_SONG_IDX,
    currSongIdx
  }
}

export function getActionIsPlaying(isPlaying) {
  return {
    type: IS_PLAYING,
    isPlaying
  }
}

export function getActionCurrStationIdx(currStationIdx) {
  return {
    type: SET_CURR_STATION_IDX,
    currStationIdx
  }
}

export async function togglePlaying(isPlaying) {
  try {
    store.dispatch(getActionIsPlaying(!isPlaying))
    return !isPlaying
  } catch (err) {
    console.log('cannot play/pause', err)
    throw err
  }
}

export async function setCurrSongIdx(songIdx) {
  try {
    // localStorage.setItem("currSong", song.id)
    store.dispatch(getActionCurrSongIdx(songIdx))
    // return songIdx
    //! CHECK THE RETURN VALUE
  } catch (err) {
    console.log('cannot set current song', err)
    throw err
  }
}

export async function setCurrStationIdx(stationIdx) {
  try {
    store.dispatch(getActionCurrStationIdx(stationIdx))
    // return stationIdx
    // !CHECK THIS AS WELL
  } catch (err) {
    console.log('cannot set station', err)
    throw err
  }
}