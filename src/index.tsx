import { React, Loadable, Loading } from './react/bridge'
import ReactDOM from 'react-dom'
import { 
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'

import Nav from './react/component/nav'
import Sidebar from './react/component/sidebar'
const Home = Loadable({
    loader: () => import('./react/pages/home'),
    loading: Loading
}),
    Error = Loadable({
        loader: () => import('./react/pages/error'),
        loading: Loading
});

import './assets/css/init.css'
import './assets/material-icon/material-icons.css'

const Root = () => {
    return (
        <Router>
            <Nav />
            <Sidebar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route component={Error} />
            </Switch>
        </Router>
    )
}

ReactDOM.render(<Root />, document.getElementById('opener-pro'));