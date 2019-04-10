import {
    React,
    useState,
    useEffect,
    useContext,
    storeContext,
    ButtonBase,
    Redirect
} from '../bridge'

import '../../assets/css/generate.css'
import '../../assets/css/button.css'

export default (props:any) => {
    const dispatch:any = useContext(storeContext);

    const [uri, setUri] = useState("data:image/png;base64,a"),
        [redirectState, setRedirectState]:any = useState(false);    

    const generate = () => {
        let canvas:any = document.getElementById("generate-canvas"),
            ctx:any = canvas.getContext("2d"),
            color:string = props.store.code,
            colorLength:number = color.length;

        canvas.width = 300;
        canvas.height = 300;

        if(colorLength < 6){
            for(let i=colorLength; i<6; i++){
                color += "f"
            }
        }

        ctx.fillStyle = `#${color}`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    
        setUri(canvas.toDataURL("image/png"));
    }

    useEffect(() => {
        generate();
    });

    const handleKey = (evt:any) => {
        if(evt.target.value.length >= 6 && (evt.keyCode !== 8 && evt.keyCode !== 9) && evt.keyCode !== 17 && evt.keyCode !== 65
            && evt.keyCode !== 36 && evt.keyCode !== 37 && evt.keyCode !== 38 && evt.keyCode !== 39) evt.target.blur();
    }

    const handleCode = (evt:any) => {
        if(evt.target.value.length > 6 || evt.target.value.length < 1) return false;
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
        <div id="pages">
            { redirectState ? <Redirect to="redirect" push /> : null }
            <div id="generate-page">
                <canvas id="generate-canvas" style={{display:"none"}}></canvas>
                <img id="generate-preview" src={uri} />
                <div id="generate-input-wrapper">
                    <label id="generate-label">#</label>
                    <input 
                        id="generate-input"
                        type="tel"
                        placeholder="000000"
                        onBlur={e => handleCode(e)} onKeyDown={e => handleKey(e)} 
                    />
                </div>
                <div id="generate-detail">
                    <ButtonBase className="button-wrapper">
                        <a className="button secondary" href={uri} download>
                            Download <i className="material-icons" style={{cursor:"pointer"}}>vertical_align_bottom</i>
                        </a>
                    </ButtonBase>
                    <ButtonBase className="button-wrapper" onClick={() => redirect()}>
                        <a className="button">
                            Redirect <i className="material-icons" style={{cursor:"pointer"}}>chevron_right</i>
                        </a>
                    </ButtonBase>
                </div>
            </div>
        </div>
    )
}