import { 
    React, 
    Loadable, 
    Loading, 
    useReducer,
    storeContext,
    useState
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
}),
Generate:any = Loadable({
    loader: () => import('./react/pages/generate'),
    loading: Loading
}),
Settings:any = Loadable({
    loader: () => import('./react/pages/settings'),
    loading: Loading
});

import Warning from './react/pages/warning'

import './assets/css/init.css'
import './assets/css/responsive.css'
import './assets/material-icon/material-icons.css'

const Root = () => {
    const [state, dispatch]:any = useReducer(reducers, initState),
        [warning, setWarning] = useState(false);

    return (
        <Router>
            <storeContext.Provider value={dispatch}>
                <Nav store={state} />
                <Sidebar store={state} />
            </storeContext.Provider>
            { warning ?
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
                        path="/settings"
                        render={() => (
                            <storeContext.Provider value={dispatch}>
                                <Settings store={state} />
                            </storeContext.Provider>
                        )}
                    />

                    <Route exact component={Error} />
                </Switch>
            : 
            <storeContext.Provider value={dispatch}>
                <Warning function={() => setWarning(true)} />
            </storeContext.Provider>
            }
        </Router>
    )
}

ReactDOM.render(<Root />, document.getElementById('opener-pro'));