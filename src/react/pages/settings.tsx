/* React */
import React, {
    useState,
    useEffect,
    Fragment
} from 'react'

/* Material UI */
import { Checkbox } from '@material-ui/core'

/* Bridge */
import {
    ButtonBase,
    Loading,
    Helmet,
    getIDBSetting,
    setIDBSetting
} from '../bridge'

/* CSS */
import '../../assets/css/settings.css'

interface ButtonPanelInterface {
    title: string,
    buttonTitle: string,
    function?: any,
    id?: string
}

/* Component */
const ButtonPanel = (props:ButtonPanelInterface) => 
    <div>
        <p>{props.title}</p>
        {props.id ?
        <ButtonBase className="setting-button" id={props.id}>
            {props.buttonTitle}
        </ButtonBase> :
        <ButtonBase className="setting-button" onClick={(evt) => props.function(evt)}>
            {props.buttonTitle}
        </ButtonBase>
        }
    </div>

interface CheckPanelInterface {
    title: string,
    aria: string,
    checkValue: boolean,
    function: any,
}

/* Component */
const CheckPanel = (props:CheckPanelInterface) => {
    let checkValue = props.checkValue || false

    return(
        <div>
            <p>{props.title}</p>
            <Checkbox
                className="check"
                checked={checkValue}
                onChange={() => props.function()}
                value={props.aria}
            />
        </div>
    );
}

interface LinkInterface {
    title: string,
    buttonTitle: string,
    link: string,
}

const LinkPanel = (props:LinkInterface) =>
    <div>
        <p>{props.title}</p>
        <a className="link-panel-button" href="https://api.opener.mystiar.com">
            <ButtonBase tabIndex={-1} className="setting-button">
                {props.buttonTitle}
            </ButtonBase>
        </a>
    </div>

const Settings = () => {
    /* Defination */
    const [blurDashboard, setBlurDashboard] = useState(false),
        [blurPreview, setBlurPreview] = useState(false),
        [blurSearchPreview, setBlurSearchPreview] = useState(false),
        [dontSaveHistory, setdontSaveHistory] = useState(false),
        [showLoading, setShowLoading] = useState(false),
        [a2hs, setA2hs] = useState(false);

    /* Effect */
    useEffect(() => {            
        getIDBSetting("blurDashboard", false).then(data => {
            setBlurDashboard(data);
        });
        getIDBSetting("blurPreview", false).then(data => {
            setBlurPreview(data);
        });
        getIDBSetting("blurSearchResult", false).then(data => {
            setBlurSearchPreview(data);
        });
        getIDBSetting("dontSaveHistory", false).then(data => {
            setdontSaveHistory(data);
        });

        window.addEventListener('beforeinstallprompt', (e:any) => {
            e.preventDefault();

            let deferredPrompt = e;
            setA2hs(true);

            document.getElementById("a2hs").addEventListener("click", a2hsEvent => {
                deferredPrompt.prompt();
        
                deferredPrompt.userChoice.then((choiceResult:any) => {
                    deferredPrompt = null;
                });
            });
        });
    }, []);

    /* Function */
    const clearCache:Function = () => {
        setShowLoading(true);
        navigator.serviceWorker.getRegistrations().then(registrations => {
            caches.keys().then(names => {
                for (let name of names)
                caches.delete(name);
            });
            for(let registration of registrations) {
                registration.unregister()
            }
        }).then(() => {
            setTimeout(() => {
                window.location.reload();
            }, 375);
        })
    }

    const forceUpdate:Function = () => {
        if(navigator.onLine === false) return;

        setShowLoading(true);
        navigator.serviceWorker.getRegistrations().then(registrations => {

            caches.keys().then(names => {
                for (let name of names)
                caches.delete(name);
            });
            for(let registration of registrations) {
                registration.unregister()
            } 

        }).then(():void => {

            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('sw.js', {
                    scope: "/"
                }).then(registration => {
                    console.info('Registered:', registration);
                }).catch(err => {
                    console.error('Registration failed: ', err);
                });
            }

        }).then(():void => {
            
            setInterval(() => {
                window.location.replace("/")
            }, 275);

        });
    }

    return(
        <Fragment>
            <Helmet
                title={"Settings"}
                meta={[
                    {
                        name: 'title',
                        content: 'Manage NHentai Opener settings.'
                    },
                    {
                        name: 'description',
                        content: "A safe platform for reading doujinshi's hentai. With hentai encryption on images. Also is an alternative way (also easier and safer) for finding hentai and read hentai with a more secure way."
                    },
                    {
                        name: 'og:title',
                        content: 'Manage NHentai Opener settings.'
                    },
                    {
                        name: 'og:description',
                        content: "A safe platform for reading doujinshi's hentai. With hentai encryption on images. Also is an alternative way (also easier and safer) for finding hentai and read hentai with a more secure way."
                    },
                    {
                        name: 'twitter:description',
                        content: "A safe platform for reading doujinshi's hentai. With hentai encryption on images. Also is an alternative way (also easier and safer) for finding hentai and read hentai with a more secure way."
                    }
                ]}
            />

            <div id="pages">
                {showLoading ? <Loading instant /> : null}
                <div id="settings">
                    
                    <div className="setting-card">
                        <div>
                            <h2>NHentai Opener 1.3.0.beta.2</h2>
                        </div>
                    </div>

                    <div className="setting-card">

                        <h1>Privacy</h1>
                        <CheckPanel
                            title="Blur a preview image on dashboard"
                            checkValue={blurDashboard}
                            function={ async() => setBlurDashboard(await setIDBSetting("blurDashboard", false)) }
                            aria="Set blur dashboard"
                        />
                        <CheckPanel
                            title="Blur a preview image on redirect's image preview"
                            checkValue={blurPreview}
                            function={ async() => setBlurPreview(await setIDBSetting("blurPreview", false)) }
                            aria="Set save history"
                        />
                        <CheckPanel
                            title="Blur a preview image on search result"
                            checkValue={blurSearchPreview}
                            function={ async() => setBlurSearchPreview(await setIDBSetting("blurSearchResult", false)) }
                            aria="Set blur search result"
                        />
                        <CheckPanel
                            title="Don't save read history"
                            checkValue={dontSaveHistory}
                            function={ async() => setdontSaveHistory(await setIDBSetting("dontSaveHistory", false)) }
                            aria="Set save history"
                        />

                    </div>

                    <div className="setting-card">

                        <h1>Progressive</h1>
                        {a2hs && !window.matchMedia('(display-mode: standalone)').matches ?
                            <ButtonPanel 
                                title="Add to homescreen"
                                buttonTitle="Add"
                                id="a2hs"
                            />
                            : null
                        }
                        <ButtonPanel
                            title="Reload data"
                            buttonTitle="Reload"
                            function={() => window.location.reload()} 
                        />
                        <ButtonPanel
                            title="Clear all caches (Reload)"
                            buttonTitle="Clear"
                            function={() => clearCache()}
                        />
                        <ButtonPanel
                            title="Recache every files"
                            buttonTitle="Force update"
                            function={() => forceUpdate()}
                        />

                    </div>

                    <div className="setting-card">

                        <h1>Developer</h1>
                        <LinkPanel
                            title="Opener API's documentation"
                            buttonTitle="See more"
                            link="api.opener.mystiar.com"
                        />

                    </div>

                </div>

            </div>
        </Fragment>
    )
}

export default Settings