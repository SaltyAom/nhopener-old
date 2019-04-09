import {
    React,
    Loadable,
    Loading,
    ButtonBase,
    useState,
    useEffect,
    Axios
} from "../bridge"

import "../../assets/css/redirect.css"
import '../../assets/css/button.css'

const Error = Loadable({
    loader: () => import('./error'),
    loading: Loading
});

export default (props: any) => {
    if(props.store.redirectURL !== undefined){    
        const [og, setOg]:any = useState("Fetching...");

        useEffect(() => {
            let requestUrl:string = `https://opener.now.sh/api/g/${props.store.redirectURL}`;

            Axios(requestUrl).then((ogData:any) => {
                setOg(ogData.data.data);
            });
        },[]);
        
        return (
            <div id="pages">
                <link rel="prefetch" href={`https://nhentai.net/g/${props.store.redirectURL}`} />
                <div id="redirect-page">
                    <div id="redirect-image-wrapper">
                        { og.ogImage !== undefined ? 
                            <img id="redirect-preview-image" src={og.ogImage.url} />
                        : null }
                    </div>
                    <div id="redirect-detail">
                        { og === "Fetching..." ? <h6 id="preview-fetching">Fetching...</h6>
                        : <h6 id="redirect-code">{props.store.redirectURL}</h6> }
                        <h2>{og.ogTitle}</h2>
                        <h3>{og.ogDescription}</h3>
                        { og === "Fetching..." ? null :
                        <ButtonBase id="redirect-button">
                            <a className="button secondary" href={`https://nhentai.net/g/${props.store.redirectURL}`} rel="noreferrer external nofollow">
                                Read <i className="material-icons" style={{cursor:"pointer"}}>chevron_right</i>
                            </a>
                        </ButtonBase>
                        }
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <Error />
        )
    }
}