import { stationService } from '../../services/station'
import { store } from '../store'
import { IS_PLAYING, SET_CURR_TRACK, SET_CURR_TRACKS, ADD_STATION, REMOVE_STATION, SET_STATIONS, SET_STATION, UPDATE_STATION, ADD_STATION_MSG, UPDATE_LIKED_STATION } from '../reducers/station.reducer'
import { MENU_TOGGLE } from '../reducers/system.reducer'
import { youtubeService } from '../../services/youtube.service.js'
import { getRandomIntInclusive } from '../../services/util.service.js'

// Station actions:
export async function loadStations() {
    try {
        const stations = await stationService.query()
        store.dispatch(getCmdSetStations(stations))
    } catch (err) {
        console.log('Cannot load stations', err)
        throw err
    }
}

export async function loadStation(stationId) {
    try {
        console.log(stationId)
        const station = await stationService.getById(stationId)
        store.dispatch(getCmdSetStation(station))
        // return station
    } catch (err) {
        console.log('Cannot load station', err)
        throw err
    }
}

export async function removeStation(stationId) {
    try {
        await stationService.remove(stationId)
        store.dispatch(getCmdRemoveStation(stationId))
    } catch (err) {
        console.log('Cannot remove station', err)
        throw err
    }
}

export async function addStation(station) {
    try {
        const savedStation = await stationService.save(station)
        store.dispatch(getCmdAddStation(savedStation))
        return savedStation
    } catch (err) {
        console.log('Cannot add station', err)
        throw err
    }
}

export async function updateStation(station) {
    try {
        const savedStation = await stationService.save(station)
        store.dispatch(getCmdUpdateStation(savedStation))
        return savedStation
    } catch (err) {
        console.log('Cannot save station', err)
        throw err
    }
}

export async function updateLikedStation(track) {
    try {
        const likedStation = await stationService.getById('2D2M9')

        const idx = likedStation.tracks.findIndex((likedTrack) => likedTrack.spotifyId === track.spotifyId)
        console.log(idx)
        if (!likedStation.tracks.length || idx === -1) likedStation.tracks.unshift(track)
        else likedStation.tracks.splice(idx, 1)

        const savedStation = await stationService.save(likedStation)
        store.dispatch({ type: UPDATE_LIKED_STATION, station: savedStation })
        return savedStation
    } catch (err) {
        console.log('Cannot save station', err)
        throw err
    }
}

export async function addStationMsg(stationId, txt) {
    try {
        const msg = await stationService.addStationMsg(stationId, txt)
        store.dispatch(getCmdAddStationMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add station msg', err)
        throw err
    }
}

export function clearStation() {
    store.dispatch(getCmdSetStation())
}

export function setStation(station) {
    store.dispatch(getCmdSetStation(station))
}

export function toggleLibraryAction() {
    return {
        type: MENU_TOGGLE
    }
}

// Player actions:
export async function togglePlay() {
    try {
        store.dispatch(getActionIsPlaying())
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
export function setTracks() {
    try {
        store.dispatch({ type: SET_CURR_TRACKS })
    } catch (err) {
        console.log('cannot play/pause', err)
        throw err
    }
}

export function next() {
    const { currTrack, currPlayingTracks } = store.getState().stationModule
    let Idx = currPlayingTracks.findIndex(track => currTrack.spotifyId === track.spotifyId) // Get curr index

    if (Idx === currPlayingTracks.length) Idx = 0 // End of playlist
    setTrack(currPlayingTracks[++Idx])
}

export function prev() {

    const { currTrack, currPlayingTracks } = store.getState().stationModule
    let Idx = currPlayingTracks.findIndex(track => currTrack.spotifyId === track.spotifyId) // Get curr index

    if (Idx === 0) return // Start of playlist
    setTrack(currPlayingTracks[--Idx])
}

export function shuffle() {
    const { currPlayingTracks } = store.getState().stationModule

    const Idx = getRandomIntInclusive(0, currPlayingTracks.length - 1) // Shuffle
    setTrack(currPlayingTracks[Idx])
}



// Command Creators:
function getCmdSetStations(stations) {
    return {
        type: SET_STATIONS,
        stations
    }
}
function getCmdSetStation(station) {
    return {
        type: SET_STATION,
        station
    }
}
function getCmdRemoveStation(stationId) {
    return {
        type: REMOVE_STATION,
        stationId
    }
}
function getCmdAddStation(station) {
    return {
        type: ADD_STATION,
        station
    }
}
function getCmdUpdateStation(station) {
    return {
        type: UPDATE_STATION,
        station
    }
}
function getCmdAddStationMsg(msg) {
    return {
        type: ADD_STATION_MSG,
        msg
    }
}

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


// unitTestActions()
async function unitTestActions() {
    await loadStations()
    await addStation(stationService.getEmptyStation())
    await updateStation({
        _id: 'm1oC7',
        title: 'Station-Good',
    })
    await removeStation('m1oC7')
    // TODO unit test addStationMsg
}

