import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import configureStore, { history } from './store'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import { routes } from './router'

import App from './App'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import BlogDetail from './pages/BlogDetail'

const store = configureStore()
console.log('Run app')

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path={routes.home.path} component={App} />
                <Route exact path={routes.blogDetail.path} component={BlogDetail} />
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();