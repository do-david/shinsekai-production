import {combineReducers} from 'redux'
import toggleAuthentication from './authentication'
import changeTheme from './theme'

export default combineReducers({
    toggleAuthentication,
    changeTheme
})