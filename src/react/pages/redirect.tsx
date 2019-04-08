import {
    React,
    Loadable,
    Loading,
    ButtonBase,
    useState,
    useEffect
} from "../bridge"

import "../../assets/css/redirect.css"
import '../../assets/css/button.css'

const Error = Loadable({
    loader: () => import('./error'),
    loading: Loading
});

export default (props: any) => {
    if(props.store.redirectURL !== undefined){    
        /*
        const [og, setOg]:any = useState("Fetchin...");

        useEffect(() => {
            let urlEncoded:string = encodeURIComponent('https://nhentai.net/g/229345'),
                apiKey:string = 'b4d295c7-ef4e-498a-8743-a303ca3eeb7f',
                requestUrl:string = `https://opengraph.io/api/1.1/site/${urlEncoded}?app_id=${apiKey}`;

            fetch(requestUrl).then((res:any) => { return res.json() }).then((data:any) => {
                setOg(data);
                console.log(data);
            });

        },[]);
        */
        
        return (
            <div id="pages">
                <link rel="prefetch" href={`https://nhentai.net/g/${props.store.redirectURL}`} />
                <div id="redirect-page">
                    <h6 id="redirect-code">{props.store.redirectURL}</h6>
                    <h2>You're about to being redirected</h2>
                    <ButtonBase className="button-wrapper">
                        <a className="button secondary" href={`https://nhentai.net/g/${props.store.redirectURL}`} rel="noreferrer external nofollow">
                            Go to link <i className="material-icons" style={{cursor:"pointer"}}>chevron_right</i>
                        </a>
                    </ButtonBase>
                </div>
            </div>
        )
    } else {
        return (
            <Error />
        )
    }
}