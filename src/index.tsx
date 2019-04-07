import { 
    React, 
    Loadable, 
    Loading, 
    useReducer,
    useContext,
    storeContext
} from './react/bridge'
import ReactDOM from 'react-dom'
import { 
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import { reducers, initState } from "./react/store/hooks-reducers"
import Nav from './react/component/nav'
import Sidebar from './react/component/sidebar'

const Home:any = Loadable({
    loader: () => import('./react/pages/home'),
    loading: Loading
}),
Error = Loadable({
    loader: () => import('./react/pages/error'),
    loading: Loading
}),
Redirect:any = Loadable({
    loader: () => import('./react/pages/redirect'),
    loading: Loading
}),
Drop:any = Loadable({
    loader: () => import('./react/pages/drop'),
    loading: Loading
});

import './assets/css/init.css'
import './assets/material-icon/material-icons.css'

const Root = () => {
    const [state, dispatch]:any = useReducer(reducers, initState);

    return (
        <Router>
            <Nav />
            <Sidebar />
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
                    path="/redirect"
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

                <Route exact component={Error} />
            </Switch>
        </Router>
    )
}

ReactDOM.render(<Root />, document.getElementById('opener-pro'));