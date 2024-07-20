export const SET_CURR_SONG_IDX = 'SET_CURR_SONG_IDX'
export const SET_CURR_STATION_IDX = 'SET_CURR_STATION_IDX'
export const IS_PLAYING = 'IS_PLAYING'

const initialState = {
    currSongIdx: null,
    currStationIdx: null,
    isPlaying: false,
}

export function playerReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_CURR_SONG_IDX:
            newState = { ...state, currSongIdx: action.currSongIdx }
            break
        case SET_CURR_STATION_IDX:
            newState = { ...state, currStationIdx: action.currStationIdx }
            break

        case IS_PLAYING:
            newState = { ...state, isPlaying: action.isPlaying }
            break
        default:
            return state
    }
    console.log('State:', newState)
    return newState
}

