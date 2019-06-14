/* React */
import React, {
    useState,
    useEffect,
    Fragment
} from 'react'

/* Router */
import { withRouter } from "react-router-dom"

/* Bridge */
import {
    Loading,
    ButtonBase,
    Link,
    openerIDB,
    OpenerAPI,
    getIDBSetting
} from "../bridge"

/* CSS */
import "../../assets/css/redirect.css"
import '../../assets/css/button.css'
import '../../assets/css/error.css'

/* Model */
const Redirect = (props) => {
    /* Defination */
    const [hentaiData, setHentaiData] = useState<string | boolean | any>("Fetching..."),
        [blurPreview, setBlurPreview] = useState(true);

    /* Effect */
    useEffect(() => {
        /* Retrieve Settings Value */
        openerIDB.table("settings").where("title").equals("blurPreview").toArray((data:any) => {
            setBlurPreview(data[0].value);
        });

        /* Determined history function */
        OpenerAPI.getData(props.match.params.id).then((requestData:any) => {

            if(requestData.id === undefined) throw Object.assign({error:"not found"})
            setHentaiData(requestData);

            /* Determined if history saving is allowed */
            getIDBSetting("dontSaveHistory").then((setting:any) => {
                if(setting !== true){

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
            setHentaiData(undefined);
        })
    },[props.match.params.id]);
    
    /* View */
    if(hentaiData !== undefined && hentaiData !== "Fetching..."){
        return (
            <div id="pages">

                <link rel="prefetch" href={`https://nhentai.net/g/${props.match.params.id}`} />
                <link rel="dns-prefetch" href={`https://nhentai.net/g/${props.match.params.id}`} />

                <div id="redirect-page">

                    <div id="redirect-image-container">
                        <div id="redirect-image-wrapper">
                            { hentaiData.images.cover !== undefined ?
                                <Fragment>
                                    { blurPreview ?
                                        <img id="redirect-preview-image" className="blur" src={hentaiData.images.cover.src} alt="Preview Story" /> :
                                        <img id="redirect-preview-image" src={hentaiData.images.cover.src} alt="Preview Story" />
                                    }
                                </Fragment>
                            : null }
                        </div>
                    </div>

                    <div id="redirect-detail">
                        <h4 id="redirect-code">{props.match.params.id}</h4> 
                        <h1>{hentaiData.title.pretty}</h1>
                        <h2 id="redirect-description">{hentaiData.title.english}</h2>

                        <div id="redirect-paper">
                            <h3>Pages: {hentaiData.num_pages}</h3>
                            <h3>Fav: {hentaiData.num_favorites}</h3>
                        </div>

                        <div id="redirect-tag">
                            {hentaiData.tags.map((tag:any,index:number) => <div key={index}>{tag.name}</div>)}
                        </div>

                        <ButtonBase tabIndex={-1} id="h-rayriffy-button">
                            <a className="button success has-wrapper" href={`https://h.rayriffy.com/g/${props.match.params.id}`} rel="noreferrer external nofollow">
                                h.rayriffy <i className="material-icons" style={{cursor:"pointer"}}>chevron_right</i>
                            </a>
                        </ButtonBase>
                        <ButtonBase tabIndex={-1} id="redirect-button">
                            <a className="button secondary" href={`https://nhentai.net/g/${props.match.params.id}`} rel="noreferrer external nofollow">
                                nhentai <i className="material-icons" style={{cursor:"pointer"}}>chevron_right</i>
                            </a>
                        </ButtonBase>

                    </div>

                </div>
            </div>
        )
    } else if(hentaiData === "Fetching...") {
        return (
            <Loading />
        )
    } else if(navigator.onLine === false) {
        return (
            <div id="error">
                <h6 id="redirect-code">{props.match.params.id}</h6> 
                <h1>Offline</h1>
                <p>Request couldn't been made</p>

                <ButtonBase tabIndex={-1} className="button-wrapper">
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

                <ButtonBase tabIndex={-1} className="button-wrapper">
                    <Link className="button" to="/generate">
                        Return <i className="material-icons" style={{cursor:"pointer"}}>chevron_right</i>
                    </Link>
                </ButtonBase>

            </div>
        )
    }
}

export default withRouter(Redirect);