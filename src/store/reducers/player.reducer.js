export const IS_PLAYING = 'IS_PLAYING'
export const SET_CURR_SONG_IDX = 'SET_CURR_SONG_IDX'
export const SET_CURR_STATION_IDX = 'SET_CURR_STATION_IDX'

const initialState = {
    isPlaying: false,
    currSongIdx: null,
    currStationIdx: null
}

export function playerReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case IS_PLAYING:
            newState = { ...state, isPlaying: action.isPlaying }
            break
        case SET_CURR_SONG_IDX:
            newState = { ...state, currSongIdx: action.currSongIdx }
        case SET_CURR_STATION_IDX:
            newState = { ...state, currStationIdx: action.currStationIdx }
        default:
            return state
    }
    return newState
}
