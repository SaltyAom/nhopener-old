/* Model */

/* React */
import React, {
    useState,
    useEffect,
    Fragment
} from 'react'

/* Redux */
import { connect } from 'react-redux'

/* Components */
import SidebarIcon from './sidebarIcon'

/* CSS */
import '../../assets/css/sidebar.css'

/* Model */
const mapStateToProps = (state, ownProps) => {
    return {
        store: {
            toggleMenu: state.toggleMenu
        },
        props: ownProps
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: {
            ToggleMenu: toggleMenuValue => {
                dispatch({
                    type: "ToggleMenu",
                    payload: {
                        toggleMenu: toggleMenuValue
                    }
                })
            }
        }
    }
}

const Sidebar = ({ dispatch, store }) => {

    /* Connect */
    const { toggleMenu } = store
    const { ToggleMenu } = dispatch

    /* Defination */
    const [sidebarClass, setSidebarClass] = useState("active");

    useEffect(() => {
        if(toggleMenu === true){
            setSidebarClass("active");
        } else {
            setSidebarClass("");
        }
    }, [toggleMenu]);

    return(
        <Fragment>
            <aside id="sidebar" role="navigation" className={sidebarClass}>
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
            <div id="sidebar-overlay" onClick={() => ToggleMenu(false) } className={sidebarClass}></div>
        </Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)