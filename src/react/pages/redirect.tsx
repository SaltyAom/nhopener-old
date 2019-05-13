import React, {
    useState,
    useEffect,
    ReactElement,
    FunctionComponent
} from 'react'
import {
    Loading,
    ButtonBase,
    Axios,
    Link,
    openerIDB
} from "../bridge"
import { RouteComponentProps } from "react-router"
import { withRouter } from "react-router-dom"

import "../../assets/css/redirect.css"
import '../../assets/css/button.css'
import '../../assets/css/error.css'

type PathParamsType = {
    id: string,
}

type props = RouteComponentProps<PathParamsType> & {
    store: any
}

const Redirect:FunctionComponent<any> = (props: props):ReactElement<any> => {
    const [og, setOg] = useState<string | boolean | any>("Fetching..."),
        [blurPreview, setBlurPreview] = useState<boolean | any>(true);

    useEffect(() => {
        let requestUrl:string = `https://opener.now.sh/api/g/${props.match.params.id}`;

        openerIDB.table("settings").where("title").equals("blurPreview").toArray((data:any) => {
            setBlurPreview(data[0].value);
        });

        Axios(requestUrl).then((ogData:any) => {
            if(ogData.data.data.ogTitle === undefined) throw Object.assign({error:"not found"})
            setOg(ogData.data.data);
            openerIDB.table("settings").where("title").equals("dontSaveHistory").toArray((data:any) => {
                if(data[0].value !== true){
                    openerIDB.table("history").toArray().then((data:Array<any>) => {
                        if(data[data.length - 1].link !== props.match.params.id){
                            openerIDB.table("history").add({
                                title: ogData.data.data.ogTitle,
                                link: props.match.params.id,
                                timestamp: Date.now()
                            });
                        }
                    }).catch(():void => {
                        openerIDB.table("history").add({
                            title: ogData.data.data.ogTitle,
                            link: props.match.params.id,
                            timestamp: Date.now()
                        });
                    })
                }
            });
        }).catch(():void => {
            setOg(undefined);
        })
    },[props.match.params.id]);
    
    if(og !== undefined && og !== "Fetching..."){
        let tags = (og.twitterDescription).split(",");
        return (
            <div id="pages">
                <link rel="prefetch" href={`https://nhentai.net/g/${props.match.params.id}`} />
                <link rel="dns-prefetch" href={`https://nhentai.net/g/${props.match.params.id}`} />
                <div id="redirect-page">
                    <div id="redirect-image-container">
                        <div id="redirect-image-wrapper">
                            { og.ogImage !== undefined ?
                                <>
                                    { blurPreview ?
                                        <img id="redirect-preview-image" className="blur" src={og.ogImage.url} alt="Preview Story" /> :
                                        <img id="redirect-preview-image" src={og.ogImage.url} alt="Preview Story" />
                                    }
                                </>
                            : null }
                        </div>
                    </div>
                    <div id="redirect-detail">
                        <h6 id="redirect-code">{props.match.params.id}</h6> 
                        <h2>{og.ogTitle}</h2>
                        <h3 id="redirect-description">{og.ogDescription}</h3>
                        <div id="redirect-tag">
                            {tags.map((tag:string,index:number) => <div key={index}>{tag}</div>)}
                        </div>
                        <ButtonBase id="h-rayriffy-button">
                            <a className="button success has-wrapper" href={`https://h.rayriffy.com/g/${props.match.params.id}`} rel="noreferrer external nofollow">
                                h.rayriffy <i className="material-icons" style={{cursor:"pointer"}}>chevron_right</i>
                            </a>
                        </ButtonBase>
                        <ButtonBase id="redirect-button">
                            <a className="button secondary" href={`https://nhentai.net/g/${props.match.params.id}`} rel="noreferrer external nofollow">
                                nhentai <i className="material-icons" style={{cursor:"pointer"}}>chevron_right</i>
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
    } else if(navigator.onLine === false) {
        return (
            <div id="error">
                <h6 id="redirect-code">{props.match.params.id}</h6> 
                <h1>Offline</h1>
                <p>Request couldn't been made</p>
                <ButtonBase className="button-wrapper">
                    <Link className="button" to="/generate">
                        Return <i className="material-icons" style={{cursor:"pointer"}}>chevron_right</i>
                    </Link>
                </ButtonBase>
            </div>
        )
    } else {
        return (
            <div id="error">
                <h6 id="redirect-code">{props.match.params.id}</h6> 
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
}

export default withRouter(Redirect);