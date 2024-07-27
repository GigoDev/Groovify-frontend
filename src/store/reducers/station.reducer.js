import { stationService } from "../../services/station/station.service.local"

// Station CMDs
export const SET_STATIONS = 'SET_STATIONS'
export const SET_STATION = 'SET_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'
export const ADD_STATION = 'ADD_STATION'
export const UPDATE_STATION = 'UPDATE_STATION'
export const UPDATE_LIKED_STATION = 'UPDATE_LIKED_STATION'
export const ADD_STATION_MSG = 'ADD_STATION_MSG'

// Player CMDs
export const SET_CURR_TRACK = 'SET_CURR_TRACK'
export const SET_CURR_TRACKS = 'SET_CURR_TRACKS'
export const IS_PLAYING = 'IS_PLAYING'

const initialState = {
    stations: [],
    station: null,
    isPlaying: false,
    currTrack: stationService.getDefaultTrack(),
    currPlayingTracks: null
}

export function stationReducer(state = initialState, action) {
    var newState = state
    var stations
    switch (action.type) {
        // Station:
        case SET_STATIONS:
            newState = { ...state, stations: action.stations }
            break
        case SET_STATION:
            newState = { ...state, station: action.station }
            break
        case REMOVE_STATION:
            const lastRemovedStation = state.stations.find(station => station._id === action.stationId)
            stations = state.stations.filter(station => station._id !== action.stationId)
            newState = { ...state, stations, lastRemovedStation }
            break
        case ADD_STATION:
            newState = { ...state, stations: [action.station, ...state.stations] }

            break
        case UPDATE_STATION:
            stations = state.stations.map(station => (station._id === action.station._id) ? action.station : station)
            newState = { ...state, stations, station: action.station }
            break
        case UPDATE_LIKED_STATION:
            console.log(action.station)
            stations = state.stations.map(station => (station._id === action.station._id) ? action.station : station)
            newState = { ...state, stations }

            break
        case ADD_STATION_MSG:
            newState = { ...state, station: { ...state.station, msgs: [...state.station.msgs || [], action.msg] } }
            break

        // Player:
        case SET_CURR_TRACK:
            newState = { ...state, currTrack: action.currTrack, isPlaying: true }
            break
        case SET_CURR_TRACKS:
            newState = { ...state, currPlayingTracks: state.station.tracks }
            break
        case IS_PLAYING:
            newState = { ...state, isPlaying: !state.isPlaying }
            break
        default:
            return state
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialState
    const station1 = { _id: 'b101', vendor: 'Station ' + parseInt(Math.random() * 10), msgs: [] }
    const station2 = { _id: 'b102', vendor: 'Station ' + parseInt(Math.random() * 10), msgs: [] }

    state = stationReducer(state, { type: SET_STATIONS, stations: [station1] })
    console.log('After SET_STATIONS:', state)

    state = stationReducer(state, { type: ADD_STATION, station: station2 })
    console.log('After ADD_STATION:', state)

    state = stationReducer(state, { type: UPDATE_STATION, station: { ...station2, vendor: 'Good' } })
    console.log('After UPDATE_STATION:', state)

    state = stationReducer(state, { type: REMOVE_STATION, stationId: station2._id })
    console.log('After REMOVE_STATION:', state)

    const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
    state = stationReducer(state, { type: ADD_STATION_MSG, stationId: station1._id, msg })
    console.log('After ADD_STATION_MSG:', state)

    state = stationReducer(state, { type: REMOVE_STATION, stationId: station1._id })
    console.log('After REMOVE_STATION:', state)
}

