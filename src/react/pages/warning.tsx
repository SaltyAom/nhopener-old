import {
    React,
    useContext,
    storeContext,
    ButtonBase,
    Link
} from '../bridge'

import '../../assets/css/button.css'
import '../../assets/css/error.css'

export default (props: any) => {
    const dispatch:any = useContext(storeContext);

    const allow = (e:any) => {
        e.preventDefault();
        dispatch({
            type: "setAllowance",
            allow: true
        });
    }

    return(
        <div id="warning">
            <h1>Are you legally classified as an adult?</h1>
            <p>You must be classified as an adult and legally allowed to view the contents of this site in the country you are currently located.</p>
            <ButtonBase className="button-wrapper" onClick={() => props.function()}>
                <Link className="button" to="/" onClick={(e:any) => allow(e)}>
                    Proceed <i className="material-icons" style={{cursor:"pointer"}}>chevron_right</i>
                </Link>
            </ButtonBase>
        </div>
    )
}