import { 
    React,
    useState,
    useContext,
    storeContext,
    Link,
    Redirect,
    ButtonBase
} from '../bridge'
const FastAverageColor = require('fast-average-color/dist/index');
import '../../assets/css/panel.css'

export default () => {

    const [redirectState, setRedirectState]:any = useState(false),
        dispatch:any = useContext(storeContext);

    const redirect = (evt:any) => {
        let tgt = evt.target, files = tgt.files,
            opener = (document.getElementById("opener-image") as HTMLImageElement);
        if (FileReader && files && files.length) {
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
            let color:any = fac.getColor(opener),
                hexCode:string = ((color.hex).substring(1)).replace(/f/g, '');
                
            dispatch({
                type: "updateURL",
                newURL: hexCode
            });
            setRedirectState(true);
        },1000);
    }

    return(
        <div id="pages">
            <img id="opener-image" style={{display:"none"}} />

            { redirectState ? <Redirect to="redirect" push /> : null }

            <div id="panel-main" className="panel-wrapper">

                <ButtonBase id="panel-drop-ripple" className="panel">
                    <input
                        type="file" 
                        accept="image/png, image/jpeg" 
                        id="drop-ghost" 
                        onChange={(e:any) => redirect(e)} 
                    />
                    <div className="panel" id="panel-drop">
                        <i className="material-icons" style={{fontSize: 108}}>flip_to_front</i>
                        <p>Drag and drop images or click here.</p>
                    </div>
                </ButtonBase>

                <div id="panel-main-slice">

                    <ButtonBase id="panel-generate-ripple">
                        <Link to="/generate" id="panel-generate">
                            <div className="panel slice">
                                <i className="material-icons">burst_mode</i>
                                <p>Generate image from number.</p>
                            </div>
                        </Link>
                    </ButtonBase>
                    <div id="panel-sub-slice">
                        <ButtonBase id="panel-last-visit-ripple">
                            <Link to="/" className="panel sub-slice panel-inline" id="panel-last-visit">
                                <i className="material-icons">replay</i>
                                <p>Go to last visited.</p>
                            </Link>
                        </ButtonBase>
                        <ButtonBase id="panel-settings-ripple">
                            <Link to="/settings" id="panel-settings" className="panel sub-slice">
                                <i className="material-icons" style={{marginBottom:0, fontSize:48}}>settings</i>
                            </Link>
                        </ButtonBase>
                    </div>

                </div>

            </div>
            <div id="panel-control" className="panel-wrapper" style={{paddingRight:15}}>

                <ButtonBase id="panel-history-ripple" className="panel panel-flex">
                    <Link to="/history" id="panel-history">
                        <i className="material-icons">restore</i>
                        <p>Check history and replay.</p>
                    </Link>
                </ButtonBase>

                <ButtonBase id="panel-cloud-ripple" className="panel panel-flex">
                    <Link to="/user">
                        <i className="material-icons">cloud</i>
                        <p>Save history across platform.</p>
                    </Link>
                </ButtonBase>
                
            </div>
        </div>
    )
}