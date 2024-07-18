export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const MENU_TOGGLE = 'MENU_TOGGLE'

const initialState = {
  isLoading: false,
  toggleLibrary: false
}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }
    case MENU_TOGGLE:
      return {
        ...state,
        toggleLibrary: !state.toggleLibrary
      }
    default: return state
  }
}
