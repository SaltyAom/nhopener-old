/* React */
import React, {
    useState,
    useEffect,
    Fragment
} from 'react'

/* Router */
import { withRouter } from "react-router-dom"

/* Bridge */
import {
    ButtonBase,
    Redirect,
    Helmet
} from '../bridge'

/* Redux */
import { connect } from 'react-redux'

/* CSS */
import '../../assets/css/generate.css'
import '../../assets/css/button.css'

/* Model */
const mapStateToProps = (state, ownProps) => {
    return {
        store: {
            code: state.code
        },
        props: ownProps
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: {

            updateURL: (newURL) => {
                dispatch({
                    type: "UpdateCode",
                    payload: {
                        code: newURL
                    }
                })
            },
            updateCode: (newCode) => {
                dispatch({
                    type: "UpdateCode",
                    payload: {
                        code: newCode
                    }
                });
            }

        }
    }
}

/* View */
const Generate = ({ dispatch, store, props }) => {
    /* Connect */
    const { updateURL, updateCode } = dispatch
    const { code } = store

    /* Defination */
    const [uri, setUri] = useState("data:image/jpeg;base64,a"),
        [redirectState, setRedirectState] = useState(false),
        [shadowColor, setShadowColor] = useState(code);

    /* Effect */
    useEffect(() => {
        if(props.match.params.id !== undefined){
            updateCode(props.match.params.id)
        }
        // eslint-disable-next-line
    }, [props.match.params.id]);

    useEffect(() => {
        generate();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(code !== undefined){
            generate();
        }
        // eslint-disable-next-line
    }, [code]);

    /* Function */
    const generate:Function = () => {
        if(code === undefined) return;

        let canvas:any = document.getElementById("generate-canvas"),
            ctx:any = canvas.getContext("2d"),
            color:string = code,
            colorLength:number;
        
        if(color){
            colorLength = color.length;
        }

        canvas.width = 256;
        canvas.height = 256;

        if(colorLength < 6){
            for(let i=colorLength; i<6; i++){
                color += "f"
            }
        }

        ctx.scale(5,5);

        if(code === ''){
            setShadowColor('000000');
        } else {
            setShadowColor(color);
        }

        ctx.fillStyle = `#${color}`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        setUri(canvas.toDataURL("image/png", 1));
    }

    const handleKey:Function = (evt:any):void => {
        if(evt.target.value.length >= 6 && (evt.keyCode !== 8 && evt.keyCode !== 9) && evt.keyCode !== 17 && evt.keyCode !== 65
            && evt.keyCode !== 36 && evt.keyCode !== 37 && evt.keyCode !== 38 && evt.keyCode !== 39) evt.target.blur();
    }

    const handleCode:Function = (evt:any) => {
        if(evt.target.value.length > 6 ) return false
        updateCode(evt.target.value)
        generate()
    }

    const redirect:Function = ():void => {
        setTimeout(() => {
            updateURL(code)
            setRedirectState(true)
        },350);
    }
    
    /* View */
    return(
        <Fragment>
            <Helmet
                title={"Decrypt"}
                meta={[
                    {
                        name: 'title',
                        content: 'Decrypt hentai code'
                    },
                    {
                        name: 'description',
                        content: 'Share your favorite doujinshi hentai safe and securely with code encryption to images with NHentai Opener, a safe and secure platform for reading doujinshi hentai. Alternative for nhentai stories finding.'
                    },
                    {
                        name: 'og:title',
                        content: 'Decrypt hentai code'
                    },
                    {
                        name: 'og:description',
                        content: 'Share your favorite doujinshi hentai safe and securely with code encryption to images with NHentai Opener, a safe and secure platform for reading doujinshi hentai. Alternative for nhentai stories finding.'
                    },
                    {
                        name: 'twitter:description',
                        content: 'Share your favorite doujinshi hentai safe and securely with code encryption to images with NHentai Opener, a safe and secure platform for reading doujinshi hentai. Alternative for nhentai stories finding.'
                    }
                ]}
            />

            <div id="pages">

                { redirectState ? <Redirect to={`/redirect/${code}`} push /> : null }                

                <div role="form" id="generate-page">

                    <canvas id="generate-canvas" style={{display:"none"}}></canvas>
                    <img
                        id="generate-preview" 
                        src={uri} 
                        alt="Generated Preview"
                        style={{
                            boxShadow: `0 12px 35px #${shadowColor}85`
                        }}
                    />

                    <div id="generate-input-wrapper" >
                        <label id="generate-label">#</label>
                        <input
                            autoComplete="off"
                            id="generate-input"
                            type="tel"
                            placeholder="000000"
                            aria-labelledby="Generate Code Input, maximum 6 digits"
                            onBlur={e => handleCode(e)} onKeyDown={e => handleKey(e)} 
                        />
                    </div>

                    <div id="generate-detail">
                        <ButtonBase tabIndex={-1} id="generate-download" className="button-wrapper">
                            <a className="button secondary" href={uri} download={`${code}.png`}>
                                Download <i className="material-icons" style={{cursor:"pointer"}}>vertical_align_bottom</i>
                            </a>
                        </ButtonBase>
                        <ButtonBase tabIndex={-1} className="button-wrapper" onClick={() => redirect()}>
                            <a className="button" href="#generate-page" onClick={evt => evt.preventDefault()}>
                                Redirect <i className="material-icons" style={{cursor:"pointer"}}>chevron_right</i>
                            </a>
                        </ButtonBase>
                    </div>

                </div>

            </div>
        </Fragment>
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Generate))