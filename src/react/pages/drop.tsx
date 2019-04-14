import React, {
    useState,
    useContext,
    FunctionComponent,
    ReactElement
} from 'react'
import { 
    storeContext,
    Redirect
} from "../bridge"
const FastAverageColor = require('fast-average-color/dist/index');

import '../../assets/css/drop.css'

const Drop:FunctionComponent<null> = ():ReactElement<null> => {
    const [redirectState, setRedirectState] = useState<boolean | any>(false),
        [redirectID, setRedirectID] = useState<number | any>(0),
        dispatch:any = useContext(storeContext);

    const redirect:Function = (evt:any):void => {
        let tgt:HTMLInputElement = evt.target, files = tgt.files,
            opener:HTMLImageElement = (document.getElementById("opener-image") as HTMLImageElement);
        if (FileReader && files && files.length) {
            let fr:any = new FileReader();
            fr.onload = ():any => {
                opener.src = fr.result;
            }
            fr.readAsDataURL(files[0]);
        } else {
        }

        const fac:any = new FastAverageColor();
        setTimeout(() => {
            let color:any = fac.getColor(opener),
                hexCode:string = ((color.hex).substring(1)).replace(/f/g, '');
                setRedirectID(hexCode);
                
            dispatch({
                type: "updateURL",
                newURL: hexCode
            });
            setRedirectState(true);
        },350);
    }

    return(
        <div id="pages">
            <img id="opener-image" style={{display:"none"}} />
            <input
                id="drop-input" 
                type="file" 
                accept="image/png, image/jpeg"
                onChange={(e:any) => redirect(e)}
            />
            <div id="drop-placeholder">
                <i className="material-icons" id="drop-icon">flip_to_front</i>
                <p id="drop-label">Drag and drop images or click here.</p>
            </div>

            { redirectState ? <Redirect to={`redirect/${redirectID}`} push /> : null }
        </div>
    )
}

export default Drop