import { React, Link, ButtonBase } from '../bridge'
import '../../assets/css/error.css'

export default () => {
    return(
        <div id="error">
            <h1>404</h1>
            <p>pages not found...</p>
            <ButtonBase id="error-back-wrapper" style={{color: "black"}}>
                <Link id="error-back" to="/">
                    Return <i className="material-icons" style={{cursor:"pointer"}}>chevron_right</i>
                </Link>
            </ButtonBase>
        </div>
    )
}