/* React */
import React from 'react'
import { connect } from 'react-redux'

/* Bridge */
import { 
    ButtonBase,
    NavLink
} from '../bridge'

const mapStateToProps = (state, ownProps) => {
    return {
        props: ownProps
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: {

            closeSidebar: () => {
                dispatch({
                    type: "ToggleMenu",
                    payload: {
                        toggleMenu: false
                    }
                })
            }

        }
    }
}

/* Sub Component */
const SidebarIcon = ({ dispatch, props }) => {
    const { to, icon, title } = props
    const { closeSidebar } = dispatch

    return(
        <NavLink onClick={() => closeSidebar()} exact to={to} className="sidebar-nav-link" activeClassName="sidebar-nav-link-active">
            <ButtonBase tabIndex={-1} className="sidebar-nav-wrapper" style={{color: "#ccc"}}>
                <i className="material-icons">{icon}</i>
                <p className='sidebar-detail'>{title}</p>
            </ButtonBase>
        </NavLink>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarIcon)