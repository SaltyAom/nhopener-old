import React, {
    useState,
    useEffect,
    FunctionComponent,
    ReactElement,
    useContext
} from 'react'
import { 
    ButtonBase,
    NavLink,
    storeContext
} from '../bridge'
import '../../assets/css/sidebar.css'

interface props {
    icon: string,
    to: string,
    title: string
}

const SidebarIcon:FunctionComponent<props> = (props: props):ReactElement<any> => {
    const dispatch:any = useContext(storeContext);

    const closeSidebar = () => {
        dispatch({
            type: "toggleMenu",
            toggleMenu: false
        })
    }

    return(
        <NavLink onClick={() => closeSidebar()} exact to={`${props.to}`} className="sidebar-nav-link" activeClassName="sidebar-nav-link-active">
            <ButtonBase className="sidebar-nav-wrapper" style={{color: "#ccc"}}>
                <i className="material-icons">{props.icon}</i>
                <p className='sidebar-detail'>{props.title}</p>
            </ButtonBase>
        </NavLink>
    )
}

const Sidebar:FunctionComponent<any> = (props: any):ReactElement<any> => {
    const [sidebarClass, setSidebarClass] = useState<string | any>("active"),
        dispatch:any = useContext(storeContext);

    useEffect(() => {
        if(props.store.toggleMenu === true){
            setSidebarClass("active");
        } else {
            setSidebarClass("");
        }
    }, [props.store.toggleMenu]);

    const closeSidebar = () => {
        dispatch({
            type: "toggleMenu",
            toggleMenu: false
        })
    }

    return(
        <>
            <aside id="sidebar" className={sidebarClass}>
                <div id="sidebar-body">
                    <SidebarIcon 
                        to="/" 
                        icon="apps" 
                        title="Dashboard" 
                    />
                    <SidebarIcon 
                        to="/drop" 
                        icon="flip_to_front" 
                        title="Decrypt" 
                    />
                    <SidebarIcon 
                        to="/generate" 
                        icon="burst_mode" 
                        title="Generate" 
                    />
                    <SidebarIcon 
                        to="/history" 
                        icon="restore" 
                        title="History" 
                    />
                </div>
                <div id="sidebar-footer">
                    <SidebarIcon 
                        to="/settings" 
                        icon="settings" 
                        title="Settings" 
                    />
                </div>
            </aside>
            <div id="sidebar-overlay" onClick={() => closeSidebar()} className={sidebarClass}></div>
        </>
    )
}

export default Sidebar;