/* React */
import React, {
    useState,
    Fragment
} from 'react'
import { connect } from 'react-redux'

/* Bridge */
import {
    ButtonBase,
    Link,
    openerIDB,
    Helmet
} from '../bridge'

/* Material UI */
import { Checkbox } from "@material-ui/core"

/* CSS */
import '../../assets/css/button.css'
import '../../assets/css/error.css'

/* Model */
const mapStateToProps = (store, ownProps) => {
    return {
        props: ownProps
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        dispatch:{

            setAllowance: () => {
                dispatch({
                    type: "SetAllowance",
                    payload: {
                        allow: true
                    }
                });
            }

        }
    }
}

/* View */
const Warning = ({ dispatch, props }) => {
    /* Connect */
    const { setAllowance } = dispatch

    /* Defination */
    const [blur, setBlur] = useState(false);

    /* Function */
    const allow:Function = async(e:any) => {
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
        setAllowance();
    }

    return(
        <Fragment>
            <Helmet
                title={"NHentai Opener"}
                meta={[
                    {
                        name: 'title',
                        content: 'NHentai Opener'
                    },
                    {
                        name: 'description',
                        content: "A safe platform for reading doujinshi's hentai. With hentai encryption on images. Also is an alternative way (also easier and safer) for finding hentai and read hentai with a more secure way."
                    },
                    {
                        name: 'og:title',
                        content: 'NHentai Opener'
                    },
                    {
                        name: 'og:description',
                        content: "A safe platform for reading doujinshi's hentai. With hentai encryption on images. Also is an alternative way (also easier and safer) for finding hentai and read hentai with a more secure way."
                    },
                    {
                        name: 'twitter:description',
                        content: "A safe platform for reading doujinshi's hentai. With hentai encryption on images. Also is an alternative way (also easier and safer) for finding hentai and read hentai with a more secure way."
                    }
                ]}
            />
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
                <ButtonBase tabIndex={-1} className="button-wrapper" onClick={() => props.function()}>
                    <Link className="button" to="/" onClick={(e:any) => allow(e)}>
                        Proceed <i className="material-icons" style={{cursor:"pointer"}}>chevron_right</i>
                    </Link>
                </ButtonBase>
            </div>
        </Fragment>
    )
}

/* Control */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Warning)