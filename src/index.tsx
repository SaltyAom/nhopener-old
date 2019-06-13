import React, {
    useState,
    useReducer,
    FunctionComponent,
    useEffect
} from 'react'
import { render } from "react-dom"
import { 
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import {
    Loadable,
    Loading, 
    storeContext,
} from './react/bridge'

import { reducers, initState } from "./react/store/hooks-reducers"
import Nav from './react/component/nav'
import Sidebar from './react/component/sidebar' /* webpackChunkName: "sidebar" */

import './assets/css/init.css'
import './assets/css/responsive.css'
import './assets/material-icon/material-icons.css'

import * as serviceWorker from './serviceWorker';

const Home:any = Loadable({
    loader: () => import('./react/pages/home' /* webpackChunkName: "home" */),
    loading: Loading
}),
Error = Loadable({
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
History:any = Loadable({
    loader: () => import('./react/pages/history' /* webpackChunkName: "history" */),
    loading: Loading
}),
Warning:any = Loadable({
    loader: () => import('./react/pages/warning' /* webpackChunkName: "warning" */),
    loading: Loading
}),
SearchResult:any = Loadable({
    loader: () => import('./react/pages/searchResult' /* webpackChunkName: "searchResult" */),
    loading: Loading
});

const Root:FunctionComponent = () => {
    const [state, dispatch]:any = useReducer(reducers, initState),
        [warning, setWarning] = useState<boolean | any>(true);

    useEffect(() => {
        window.onload = () => {
            serviceWorker.register();
            console.log("REGISTER");
        }
    }, []);

    return (
        <Router>
            <storeContext.Provider value={dispatch}>
                <Nav store={state} />
                <Sidebar store={state} />
            </storeContext.Provider>
            { !warning ?
                <Switch>
                    <Route 
                        exact 
                        path="/" 
                        render={() => (
                            <storeContext.Provider value={dispatch}>
                                <Home store={state} />
                            </storeContext.Provider>
                        )}
                    />
                    <Route
                        exact 
                        path="/redirect/:id"
                        render={() => (
                            <storeContext.Provider value={dispatch}>
                                <Redirect store={state} />
                            </storeContext.Provider>
                        )}
                    />
                    <Route
                        exact
                        path="/drop" 
                        render={() => (
                            <storeContext.Provider value={dispatch}>
                                <Drop store={state} />
                            </storeContext.Provider>
                        )}
                    />
                    <Route
                        exact
                        path="/generate" 
                        render={() => (
                            <storeContext.Provider value={dispatch}>
                                <Generate store={state} />
                            </storeContext.Provider>
                        )}
                    />
                    <Route
                        exact
                        path="/generate/:id"
                        render={() => (
                            <storeContext.Provider value={dispatch}>
                                <Generate store={state} />
                            </storeContext.Provider>
                        )}
                    />
                    <Route
                        exact
                        path="/history"
                        render={() => (
                            <storeContext.Provider value={dispatch}>
                                <History store={state} />
                            </storeContext.Provider>
                        )}
                    />
                    <Route
                        exact
                        path="/settings"
                        render={() => (
                            <storeContext.Provider value={dispatch}>
                                <Settings store={state} />
                            </storeContext.Provider>
                        )}
                    />
                    <Route
                        exact
                        path="/search"
                        render={() => (
                            <storeContext.Provider value={dispatch}>
                                <SearchResult store={state} />
                            </storeContext.Provider>
                        )}
                    />
                    <Route
                        exact
                        path="/search/:id"
                        render={() => (
                            <storeContext.Provider value={dispatch}>
                                <SearchResult store={state} />
                            </storeContext.Provider>
                        )}
                    />

                    <Route exact component={Error} />
                </Switch>
            : 
            <storeContext.Provider value={dispatch}>
                <Warning function={() => setWarning(!warning)} />
            </storeContext.Provider>
            }
        </Router>
    )
}

const rootElement = document.getElementById('opener-pro');
render(<Root />, rootElement);