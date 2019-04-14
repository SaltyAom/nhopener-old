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
}),
History:any = Loadable({
    loader: () => import('./react/pages/history'),
    loading: Loading
}),
Warning:any = Loadable({
    loader: () => import('./react/pages/warning'),
    loading: Loading
});

import './assets/css/init.css'
import './assets/css/responsive.css'
import './assets/material-icon/material-icons.css'

const Root = () => {
    const [state, dispatch]:any = useReducer(reducers, initState),
        [warning, setWarning]:any = useState(false);

    return (
        <Router>
            <storeContext.Provider key={99} value={dispatch}>
                <Nav store={state} />
                <Sidebar store={state} />
            </storeContext.Provider>
            { warning ?
                <Switch>
                    <Route 
                        exact 
                        path="/" 
                        key={0}
                        render={() => (
                            <storeContext.Provider key={0} value={dispatch}>
                                <Home store={state} />
                            </storeContext.Provider>
                        )}
                    />
                    <Route
                        exact 
                        path="/redirect/:id"
                        key={1}
                        render={() => (
                            <storeContext.Provider key={1} value={dispatch}>
                                <Redirect store={state} />
                            </storeContext.Provider>
                        )}
                    />
                    <Route
                        exact
                        path="/drop" 
                        key={2}
                        render={() => (
                            <storeContext.Provider key={2} value={dispatch}>
                                <Drop store={state} />
                            </storeContext.Provider>
                        )}
                    />
                    <Route
                        exact
                        path="/generate" 
                        key={3}
                        render={() => (
                            <storeContext.Provider key={3} value={dispatch}>
                                <Generate store={state} />
                            </storeContext.Provider>
                        )}
                    />
                    <Route
                        exact
                        path="/history"
                        key={4}
                        render={() => (
                            <storeContext.Provider key={4} value={dispatch}>
                                <History store={state} />
                            </storeContext.Provider>
                        )}
                    />
                    <Route
                        exact
                        path="/settings"
                        key={5}
                        render={() => (
                            <storeContext.Provider key={5} value={dispatch}>
                                <Settings store={state} />
                            </storeContext.Provider>
                        )}
                    />

                    <Route exact key={6} component={Error} />
                </Switch>
            : 
            <storeContext.Provider key={6} value={dispatch}>
                <Warning function={() => setWarning(true)} />
            </storeContext.Provider>
            }
        </Router>
    )
}

ReactDOM.render(<Root />, document.getElementById('opener-pro'));