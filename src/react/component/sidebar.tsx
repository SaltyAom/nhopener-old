import { React, ButtonBase, NavLink } from '../bridge'
import '../../assets/css/sidebar.css'

interface props {
    icon: string,
    to: string
}

const SidebarIcon = (props: props) => {
    return(
        <NavLink exact to={`${props.to}`} className="sidebar-nav-link" activeClassName="sidebar-nav-link-active">
            <ButtonBase className="sidebar-nav-wrapper" style={{color: "#ccc"}}>
                <i className="material-icons">{props.icon}</i>
            </ButtonBase>
        </NavLink>
    )
}

export default () => {
    return(
        <aside id="sidebar">
            <div id="sidebar-body">
                <SidebarIcon to="/" icon="apps" />
                <SidebarIcon to="/drop" icon="flip_to_front" />
                <SidebarIcon to="/generate" icon="burst_mode" />
                <SidebarIcon to="/history" icon="restore" />
                <SidebarIcon to="/cloud" icon="cloud" />
            </div>
            <div id="sidebar-footer">
                <SidebarIcon to="/settings" icon="settings" />
            </div>
        </aside>
    )
}