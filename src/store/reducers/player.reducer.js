export const SET_CURR_TRACK = 'SET_CURR_TRACK'
export const IS_PLAYING = 'IS_PLAYING'

const initialState = {
    currTrackId: null,
    isPlaying: false,
    currTrack:null
}

export function playerReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_CURR_TRACK:
            console.log('currTrack',action.currTrack)
            newState = { ...state, currTrack: action.currTrack }
            break
        case IS_PLAYING:
            newState = { ...state, isPlaying: !state.isPlaying }
            break
        default:
            return state
    }
    return newState
}

