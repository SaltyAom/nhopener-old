import { 
    React,
    useContext,
    useState,
    storeContext,
    Redirect,
    Loading
} from "../bridge"
const FastAverageColor = require('fast-average-color/dist/index');

import '../../assets/css/drop.css'

export default () => {
    const [redirectState, setRedirectState]:any = useState(false),
        [loadingState, setLoadingState] = useState(false),
        dispatch:any = useContext(storeContext);

    const redirect = (evt:any) => {
        let tgt = evt.target, files = tgt.files,
            opener = (document.getElementById("opener-image") as HTMLImageElement);
        if (FileReader && files && files.length) {
            setLoadingState(true);
            let fr:any = new FileReader();
            fr.onload = ():any => {
                opener.src = fr.result;
            }
            fr.readAsDataURL(files[0]);
        } else {
            console.error(`error`);
        }

        const fac:any = new FastAverageColor();
        setTimeout(_ => {
            let color:any = fac.getColor(opener);
            dispatch({
                type: "updateURL",
                newURL: (color.hex).substring(1)
            });
            setRedirectState(true);
        },1000);
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

            { loadingState ? <Loading type="overlay" /> : null }
            { redirectState ? <Redirect to="redirect" push exact /> : null }
        </div>
    )
}