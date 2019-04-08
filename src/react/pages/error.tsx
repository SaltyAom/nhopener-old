import { React, Link, ButtonBase } from '../bridge'

import '../../assets/css/error.css'
import '../../assets/css/button.css'

export default () => {
    return(
        <div id="error">
            <h1>404</h1>
            <p>pages not found...</p>
            <ButtonBase className="button-wrapper">
                <Link className="button" to="/">
                    Return <i className="material-icons" style={{cursor:"pointer"}}>chevron_right</i>
                </Link>
            </ButtonBase>
        </div>
    )
}