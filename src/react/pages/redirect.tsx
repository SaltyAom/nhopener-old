import {
    React,
    Loadable,
    Loading,
    ButtonBase,
    useState,
    useEffect,
    Axios,
    Link
} from "../bridge"

import "../../assets/css/redirect.css"
import '../../assets/css/button.css'
import '../../assets/css/error.css'

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
            }).catch(() => {
                setOg(undefined);
            })
        },[]);
        
        if(og !== undefined && og !== "Fetching..."){
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
                            <h2>{og.ogTitle}</h2>
                            <h3>{og.ogDescription}</h3>
                            <h6 id="redirect-code">{props.store.redirectURL}</h6> 
                            <ButtonBase id="redirect-button">
                                <a className="button secondary" href={`https://nhentai.net/g/${props.store.redirectURL}`} rel="noreferrer external nofollow">
                                    Read <i className="material-icons" style={{cursor:"pointer"}}>chevron_right</i>
                                </a>
                            </ButtonBase>
                        </div>
                    </div>
                </div>
            )
        } else if(og === "Fetching...") {
            return (
                <Loading />
            )
        } else {
            return (
                <div id="error">
                    <h1>404</h1>
                    <p>Stories not found...</p>
                    <ButtonBase className="button-wrapper">
                        <Link className="button" to="/generate">
                            Return <i className="material-icons" style={{cursor:"pointer"}}>chevron_right</i>
                        </Link>
                    </ButtonBase>
                </div>
            )
        }
    } else {
        return (
            <Error />
        )
    }
}