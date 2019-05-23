import React, {
    useState,
    useEffect,
    FunctionComponent,
    ReactElement
} from 'react'
import {
    ButtonBase,
    Loading,
    Helmet,
    getIDBSetting,
    setIDBSetting
} from '../bridge'
import { Checkbox } from '@material-ui/core'

import '../../assets/css/settings.css'

interface ButtonPanelInterface {
    title: string,
    buttonTitle: string,
    function?: any,
    id?: string
}

const ButtonPanel:FunctionComponent<any> = (props:ButtonPanelInterface):ReactElement<any> => 
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

const CheckPanel:FunctionComponent<any> = (props:CheckPanelInterface):ReactElement<any> => {
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

const LinkPanel:FunctionComponent<any> = (props:LinkInterface):ReactElement<any> =>
    <div>
        <p>{props.title}</p>
        <a className="link-panel-button" href="https://api.opener.mystiar.com">
            <ButtonBase className="setting-button">
                {props.buttonTitle}
            </ButtonBase>
        </a>
    </div>

const Settings:FunctionComponent<any> = ():ReactElement<null> => {
    const [blurDashboard, setBlurDashboard] = useState<boolean | any>(false),
        [blurPreview, setBlurPreview] = useState<boolean | any>(false),
        [blurSearchPreview, setBlurSearchPreview] = useState<boolean | any>(false),
        [dontSaveHistory, setdontSaveHistory] = useState<boolean | any>(false),
        [showLoading, setShowLoading] = useState<boolean | any>(false),
        [a2hs, setA2hs] = useState<Boolean | any>(false);

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

    const clearCache = () => {
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

    const forceUpdate = () => {
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
        <>
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
                            <h2>NHentai Opener 1.3.0.beta.1</h2>
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
        </>
    )
}

export default Settings