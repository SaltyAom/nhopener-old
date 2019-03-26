import { React, Link } from '../bridge'
const FastAverageColor = require('fast-average-color/dist/index')
import '../../assets/css/panel.css'

export default () => {
    function redirect(evt:any){
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
        const fac = new FastAverageColor();
        setTimeout(_ => {
            let color = fac.getColor(opener);
            console.log(color)
            window.location.href = `https://nhentai.net/g/${color.hex.substr(1)}`
        },1000)
    }

    return(
        <div id="pages">
            <img id="opener-image" style={{display:"none"}} />
            <div className="panel-wrapper">
                <div className="panel" id="panel-drop">
                    <input type="file" accept="image/png, image/jpeg" id="drop-ghost" onChange={(e:any) => redirect(e)} />
                    <i className="material-icons" style={{fontSize: 108}}>flip_to_front</i>
                    <p>Drag and drop images or click here.</p>
                </div>
                <div id="panel-main-slice">
                    <Link to="/generate" id="panel-generate">
                        <div className="panel slice">
                            <i className="material-icons">burst_mode</i>
                            <p>Generate image from number.</p>
                        </div>
                    </Link>
                    <div id="panel-sub-slice">
                        <Link to="/" className="panel sub-slice panel-inline" id="panel-last-visit">
                            <i className="material-icons">replay</i>
                            <p>Go to last visited.</p>
                        </Link>
                        <Link to="/settings" id="panel-settings" className="panel sub-slice">
                            <i className="material-icons" style={{marginBottom:0, fontSize:48}}>settings</i>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="panel-wrapper" style={{paddingRight:15}}>
                <Link to="/history" className="panel panel-flex" id="panel-history">
                    <i className="material-icons">restore</i>
                    <p>Check history and replay.</p>
                </Link>
                <Link to="/user" className="panel panel-flex" id="panel-cloud">
                    <i className="material-icons">cloud</i>
                    <p>Save history across platform.</p>
                </Link>
            </div>
        </div>
    )
}