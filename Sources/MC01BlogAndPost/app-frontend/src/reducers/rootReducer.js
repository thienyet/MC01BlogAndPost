import { combineReducers } from 'redux'
import simpleReducer from './simpleReducer'
import blogReducer from './blogReducer'
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
    router: connectRouter(history),
    simpleReducer,
    blogReducer
})