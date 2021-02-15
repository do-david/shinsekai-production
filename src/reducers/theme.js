
import { CHANGE_THEME } from '../actions/theme'

import { themeLight } from '../configs/theme'

const initialState = {
  currentTheme: themeLight
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        currentTheme: action.payload
      }

    default:
      return state
  }
}