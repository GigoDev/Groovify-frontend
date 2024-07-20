export const SET_PLAY = 'SET_PLAY'


const initialState = {
    setPlay: false,
}

export function playerReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_PLAY:
            newState = { ...state,  }
            break
        default: newState
    }
    return newState
}
