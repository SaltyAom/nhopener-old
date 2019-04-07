import {
    React,
    Loadable,
    Loading,
    ButtonBase
} from "../bridge"

import "../../assets/css/redirect.css"
import '../../assets/css/button.css'

const Error = Loadable({
    loader: () => import('./error'),
    loading: Loading
});

export default (props: any) => {
    if(props.store.redirectURL !== undefined){
        return (
            <div id="pages">
                <link rel="prefetch" href={`https://nhentai.net/g/${props.store.redirectURL}`} />
                <div id="redirect-page">
                    <h2>{props.store.redirectURL}</h2>
                    <ButtonBase className="button-primary-wrapper">
                        <a className="button-primary" href={`https://nhentai.net/g/${props.store.redirectURL}`} rel="noreferrer external nofollow">
                            Go to link <i className="material-icons" style={{cursor:"pointer"}}>chevron_right</i>
                        </a>
                    </ButtonBase>
                </div>
            </div>
        )
    } else {
        return (
            <div id="pages">
                <h1>Hello</h1>
            </div>
        )
    }
}