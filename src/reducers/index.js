import loggedReducer from './login'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    isLogged: loggedReducer
})

export default allReducers;