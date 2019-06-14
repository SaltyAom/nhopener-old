/* Model */

/* React */
import React, {
    useState,
    useEffect
} from 'react'
import { render } from "react-dom"

/* React Util */
import { 
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import {
    Loadable,
    Loading,
} from './react/bridge'

import { Provider } from 'react-redux'
import { store } from './react/store/store'

/* Component */
import Nav from './react/component/nav'
import Sidebar from './react/component/sidebar' /* webpackChunkName: "sidebar" */

/* CSS */
import './assets/css/init.css'
import './assets/css/responsive.css'
import './assets/material-icon/material-icons.css'

/* Service Worker */
import * as serviceWorker from './serviceWorker'

/* Lazyload */
const Home:any = Loadable({
    loader: () => import('./react/pages/home' /* webpackChunkName: "home" */),
    loading: Loading
}),
Error:any = Loadable({
    loader: () => import('./react/pages/error' /* webpackChunkName: "error" */),
    loading: Loading
}),
Redirect:any = Loadable({
    loader: () => import('./react/pages/redirect' /* webpackChunkName: "redirect" */),
    loading: Loading
}),
Drop:any = Loadable({
    loader: () => import('./react/pages/drop' /* webpackChunkName: "drop" */),
    loading: Loading
}),
Generate:any = Loadable({
    loader: () => import('./react/pages/generate' /* webpackChunkName: "generate" */),
    loading: Loading
}),
Settings:any = Loadable({
    loader: () => import('./react/pages/settings' /* webpackChunkName: "settings" */),
    loading: Loading
}),
Warning:any = Loadable({
    loader: () => import('./react/pages/warning' /* webpackChunkName: "warning" */),
    loading: Loading
}),
History:any = Loadable({
    loader: () => import('./react/pages/history' /* webpackChunkName: "searchResult" */),
    loading: Loading
});

/* View */
const Root = () => {
    /* Defination */
    const [warning, setWarning] = useState(true);

    /* Function */
    useEffect(() => {
        window.onload = () => {
            serviceWorker.register();
        }
    }, []);

    /* View */
    return (
        <Router>
            <Provider store={store}>
                <Nav />
                <Sidebar  />
                { !warning ?
                    <Switch>
                        <Route 
                            exact 
                            path="/" 
                            component={ Home }
                        />
                        <Route
                            exact 
                            path="/redirect/:id"
                            component={ Redirect }
                        />
                        <Route
                            exact
                            path="/drop" 
                            component={ Drop }
                        />
                        <Route
                            exact
                            path="/generate" 
                            component={ Generate }
                        />
                        <Route
                            exact
                            path="/generate/:id"
                            component={ Generate }
                        />
                        <Route
                            exact
                            path="/settings"
                            component={ Settings }
                        />
                        <Route
                            exact
                            path="/history"
                            component={ History }
                        />
                        <Route
                            exact
                            path="/search/:id"
                            component={ History }
                        />

                        <Route exact component={Error} />
                    </Switch>
                : 
                <Warning function={() => setWarning(!warning)} />
                }
            </Provider>
        </Router>
    )
}

const rootElement = document.getElementById('opener-pro');
render(<Root />, rootElement);