import {
    React,
    NavLink,
    Link,
    ButtonBase
} from '../bridge'
import '../../assets/css/nav.css'

interface props {
    to: String,
    icon: String
}

const NavProps = (props:props) => {
    return(
        <NavLink to={`${props.to}`} className="nav-selector-link" activeClassName="nav-selector-active">
            <div className="nav-selector">
                <i className="material-icons">{props.icon}</i>
            </div>
        </NavLink>
    )
}

export default () => {
    return(
        <nav id="nav">
            <div className="nav-section" style={{justifyContent:"flex-start"}}>
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