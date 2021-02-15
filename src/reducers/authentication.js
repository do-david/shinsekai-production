import {TOGGLE_AUTHENTICATION} from '../actions/authentication'

const initialState = {
    isAuthenticatedValue: false
}
export default (state=initialState, action) => {
    switch(action.type){
        case TOGGLE_AUTHENTICATION:
            return{
                ...state,
                isAuthenticatedValue : !state.isAuthenticatedValue
            }
        default:
            return state
    }
}