import React, {
    useState,
    useEffect,
    useContext,
    ReactElement,
    FunctionComponent
} from 'react'
import {
    storeContext,
    ButtonBase,
    Redirect,
    Helmet
} from '../bridge'

import { RouteComponentProps } from "react-router"
import { withRouter } from "react-router-dom"

import '../../assets/css/generate.css'
import '../../assets/css/button.css'


type PathParamsType = {
    id: string,
}

type props = RouteComponentProps<PathParamsType> & {
    store: any
}

const Generate:FunctionComponent<any> = (props:props):ReactElement => {
    const dispatch:any = useContext(storeContext);

    const [uri, setUri] = useState<string | any>("data:image/jpeg;base64,a"),
        [redirectState, setRedirectState]:any = useState<boolean | any>(false);

    const generate = () => {
        if(props.store.code === undefined) return;

        let canvas:any = document.getElementById("generate-canvas"),
            ctx:any = canvas.getContext("2d"),
            color:string = props.store.code,
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
        
        ctx.fillStyle = `#${color}`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        setUri(canvas.toDataURL("image/png", 1));
    }

    useEffect(() => {
        if(props.match.params.id !== undefined){
            dispatch({
                type: "updateCode",
                code: props.match.params.id
            });
        }
        // eslint-disable-next-line
    }, [props.match.params.id]);
    useEffect(() => {
        generate();
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        if(props.store.code !== undefined){
            generate();
        }
        // eslint-disable-next-line
    }, [props.store.code]);

    const handleKey = (evt:any):void => {
        if(evt.target.value.length >= 6 && (evt.keyCode !== 8 && evt.keyCode !== 9) && evt.keyCode !== 17 && evt.keyCode !== 65
            && evt.keyCode !== 36 && evt.keyCode !== 37 && evt.keyCode !== 38 && evt.keyCode !== 39) evt.target.blur();
    }

    const handleCode = (evt:any) => {
        if(evt.target.value.length > 6 ) return false;
        dispatch({
            type: "updateCode",
            code: evt.target.value
        });
        generate();
    }

    const redirect = ():void => {
        setTimeout(_ => {
            dispatch({
                type: "updateURL",
                newURL: props.store.code
            });
            setRedirectState(true);
        },350);
    }
    
    return(
        <>
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
                { redirectState ? <Redirect to={`/redirect/${props.store.code}`} push /> : null }
                <div role="form" id="generate-page">
                    <canvas id="generate-canvas" style={{display:"none"}}></canvas>
                    <img
                        id="generate-preview" 
                        src={uri} 
                        alt="Generated Preview"
                        style={{
                            boxShadow: `0 12px 35px #${props.store.code}85`
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
                            <a className="button secondary" href={uri} download={`${props.store.code}.png`}>
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
        </>
    )
}

export default withRouter(Generate);