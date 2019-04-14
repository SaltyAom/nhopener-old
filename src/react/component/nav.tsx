import React, {
    useContext,
    FunctionComponent,
    ReactElement
} from 'react'
import {
    Link,
    ButtonBase,
    storeContext
} from '../bridge'
import '../../assets/css/nav.css'

interface props {
    to: String,
    icon: String
}

/*
const NavProps:FunctionComponent<props> = (props:props):ReactElement => {
    return(
        <NavLink to={`${props.to}`} className="nav-selector-link" activeClassName="nav-selector-active">
            <div className="nav-selector">
                <i className="material-icons">{props.icon}</i>
            </div>
        </NavLink>
    )
}
*/

const Nav:FunctionComponent<any> = (props: any):ReactElement<any> => {
    const dispatch:any = useContext(storeContext);

    const toggleMenu:any = ():any => {
        dispatch({
            type: "toggleMenu",
            toggleMenu: !props.store.toggleMenu
        })
    }

    return(
        <nav id="nav">
            <div className="nav-section" style={{justifyContent:"flex-start"}}>
                <a id="nav-menu" className="material-icons" onClick={() => toggleMenu()}>menu</a>
                <Link id="nav-title" to="/">
                    Opener
                    <sup id="nav-title-sup">Pro</sup>
                </Link>
            </div>
            <div className="nav-section">
                <div id="search">
                    <i id="search-icon" className="material-icons">search</i>
                    <input id="search-box" type="text" placeholder="Search" />
                    <ButtonBase id="search-go-wrapper">
                        <i id="search-go" className="material-icons">chevron_right</i>
                    </ButtonBase>
                </div>
            </div>
            <div className="nav-section" style={{justifyContent:"flex-end"}}>
            
            </div>
        </nav>
    )
}

export default Nav;