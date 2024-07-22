import { stationService } from "../../services/station/station.service.local"

export const SET_CURR_TRACK = 'SET_CURR_TRACK'
export const IS_PLAYING = 'IS_PLAYING'

const initialState = {
    isPlaying: false,
    currTrack: stationService.getDefaultTrack()
}

export function playerReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_CURR_TRACK:
            newState = { ...state, currTrack: action.currTrack }
            break
        case IS_PLAYING:
            newState = { ...state, isPlaying: action.isPlaying }
            break
        default:
            return state
    }
    return newState
}

