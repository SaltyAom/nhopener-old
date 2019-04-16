import React, {
    useContext,
    useState,
    FunctionComponent,
    ReactElement
} from 'react'
import {
    storeContext,
    ButtonBase,
    Link,
    openerIDB
} from '../bridge'
import {
    Checkbox
} from "@material-ui/core"

import '../../assets/css/button.css'
import '../../assets/css/error.css'

const Warning:FunctionComponent<any> = (props: any):ReactElement<any> => {
    const dispatch:any = useContext(storeContext),
        [blur, setBlur] = useState(false);

    const allow = async(e:any) => {
        e.preventDefault();
        if(blur === true){
            await openerIDB.table("settings").put({
                title: "blurDashboard",
                value: true
            });
            await openerIDB.table("settings").put({
                title: "blurPreview",
                value: true
            });
        }
        dispatch({
            type: "setAllowance",
            allow: true
        });
    }

    return(
        <div id="warning">
            <h1>Are you legally classified as an adult?</h1>
            <p>You must be classified as an adult and legally allowed to view the contents of this site in the country you are currently located.</p>
            <div id="warning-setting">
                <Checkbox
                    style={{transform: "scale(.925)"}}
                    className="check"
                    checked={blur}
                    onChange={() => setBlur(!blur)}
                    value="Blur every preview image (SFW mode)"
                />
                <label id="warning-label">Blur every preview image (SFW mode)</label>
            </div>
            <ButtonBase className="button-wrapper" onClick={() => props.function()}>
                <Link className="button" to="/" onClick={(e:any) => allow(e)}>
                    Proceed <i className="material-icons" style={{cursor:"pointer"}}>chevron_right</i>
                </Link>
            </ButtonBase>
        </div>
    )
}

export default Warning;