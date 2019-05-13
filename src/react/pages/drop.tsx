import React, {
    useState,
    useContext,
    FunctionComponent,
    ReactElement
} from 'react'
import { 
    storeContext,
    Redirect,
    Helmet
} from "../bridge"

import '../../assets/css/drop.css'

const FastAverageColor = require('fast-average-color/dist/index');


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
        <>
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
        </>
    )
}

export default Drop