import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory({
    basename: '/Home/AppFrontend/'
})

//export const history = createBrowserHistory()

export default function configureStore(initialState = {}) {
    return createStore(
        rootReducer(history),
        initialState,
        compose(
            applyMiddleware(
                routerMiddleware(history),
                thunk
            ),
        )
    )
}