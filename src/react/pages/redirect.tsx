import React, {
    useState,
    useEffect,
    ReactElement,
    FunctionComponent
} from 'react'
import {
    Loading,
    ButtonBase,
    Link,
    openerIDB,
    OpenerAPI
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
        openerIDB.table("settings").where("title").equals("blurPreview").toArray((data:any) => {
            setBlurPreview(data[0].value);
        });

        OpenerAPI.getData(props.match.params.id).then((requestData:any) => {
            if(requestData.id === undefined) throw Object.assign({error:"not found"})
            setOg(requestData);
            console.log(requestData);
            openerIDB.table("settings").where("title").equals("dontSaveHistory").toArray((setting:any) => {
                if(setting[0].value !== true){
                    openerIDB.table("history").toArray().then((IDBData:Array<any>) => {
                        if(IDBData[IDBData.length - 1].link !== props.match.params.id){
                            openerIDB.table("history").add({
                                title: requestData.title.pretty,
                                link: props.match.params.id,
                                ref: requestData.images.cover.src,
                                timestamp: Date.now()
                            });
                        }
                    }).catch(():void => {
                        openerIDB.table("history").add({
                            title: requestData.title.pretty,
                            link: props.match.params.id,
                            ref: requestData.images.cover.src,
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
        return (
            <div id="pages">
                <link rel="prefetch" href={`https://nhentai.net/g/${props.match.params.id}`} />
                <link rel="dns-prefetch" href={`https://nhentai.net/g/${props.match.params.id}`} />
                <div id="redirect-page">
                    <div id="redirect-image-container">
                        <div id="redirect-image-wrapper">
                            { og.images.cover !== undefined ?
                                <>
                                    { blurPreview ?
                                        <img id="redirect-preview-image" className="blur" src={og.images.cover.src} alt="Preview Story" /> :
                                        <img id="redirect-preview-image" src={og.images.cover.src} alt="Preview Story" />
                                    }
                                </>
                            : null }
                        </div>
                    </div>
                    <div id="redirect-detail">
                        <h6 id="redirect-code">{props.match.params.id}</h6> 
                        <h2>{og.title.pretty}</h2>
                        <h3 id="redirect-description">{og.title.english}</h3>
                        <div id="redirect-paper">
                            <h4>Pages: {og.num_pages}</h4>
                            <h4>Fav: {og.num_favorites}</h4>
                        </div>
                        <div id="redirect-tag">
                            {og.tags.map((tag:any,index:number) => <div key={index}>{tag.name}</div>)}
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