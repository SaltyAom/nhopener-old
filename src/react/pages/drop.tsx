/* React */
import React, {
    useState,
    Fragment
} from 'react'

/* Redux */
import { connect } from 'react-redux'

/* Bridge */
import { 
    Redirect,
    Helmet
} from "../bridge"

/* CSS */
import '../../assets/css/drop.css'

/* Model */
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: {

            updateURL: newURL => {
                dispatch({
                    type: "UpdateURL",
                    payload: {
                        newURL: newURL
                    }
                });    
            }

        }
    }
}

/* View */
const Drop = ({ dispatch }) => {
    /* Connect */
    const { updateURL } = dispatch

    /* Defination */
    const [redirectState, setRedirectState] = useState(false),
        [redirectID, setRedirectID] = useState('0');

    /* Function */
    const redirect:Function = (event:any):void => {
        
        /* Defination */
        let psudoInputImage:HTMLInputElement = event.target, files = psudoInputImage.files,
            opener:HTMLImageElement = (document.getElementById("opener-image") as HTMLImageElement);

        
        if (FileReader && files && files.length) {
            /* Defination */
            let fileReader:any = new FileReader();

            /* Function */
            fileReader.onload = ():any => {
                opener.src = fileReader.result;
            }
            fileReader.readAsDataURL(files[0]);
        }
        
        /* Defination */
        setTimeout(() => {
            /* Require */
            const FastAverageColorModule:any = require('fast-average-color/dist/index');
            const FastAverageColor:any = new FastAverageColorModule();

            let color:any = FastAverageColor.getColor(opener),
                hexCode:string = ((color.hex).substring(1)).replace(/f/g, '');

            setRedirectID(hexCode);
            updateURL(hexCode);
            setRedirectState(true);
        },350);
    }

    /* View */
    return(
        <Fragment>
            <Helmet
                title={"Encrypt"}
                meta={[
                    {
                        name: 'title',
                        content: 'Secure your hentai sharing'
                    },
                    {
                        name: 'description',
                        content: "Decrypt images' code to provide links of doujinshi hentai you discovered with NHentai Opener, a safe and secure platform for reading doujinshi hentai. Alternative for nhentai stories finding."
                    },
                    {
                        name: 'og:title',
                        content: 'Secure your hentai sharing'
                    },
                    {
                        name: 'og:description',
                        content: "Decrypt images' code to provide links of doujinshi hentai you discovered with NHentai Opener, a safe and secure platform for reading doujinshi hentai. Alternative for nhentai stories finding."
                    },
                    {
                        name: 'twitter:description',
                        content: "Decrypt images' code to provide links of doujinshi hentai you discovered with NHentai Opener, a safe and secure platform for reading doujinshi hentai. Alternative for nhentai stories finding."
                    }
                ]}
            />
            <div id="pages">
                <img id="opener-image" style={{display:"none"}} alt="Preview" />
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
        </Fragment>
    )
}

export default connect(
    null,
    mapDispatchToProps
)(Drop)