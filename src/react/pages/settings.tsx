import React, {
    useState,
    useEffect,
    FunctionComponent,
    ReactElement
} from 'react'
import {
    openerIDB,
    ButtonBase,
    Loading
} from '../bridge'
import { Checkbox } from '@material-ui/core'

import '../../assets/css/settings.css'

interface ButtonPanelInterface {
    title: string,
    buttonTitle: string,
    function: any
}

const ButtonPanel:FunctionComponent<any> = (props:ButtonPanelInterface):ReactElement<any> => (
    <div>
        <p>{props.title}</p>
        <ButtonBase className="setting-button" onClick={(evt) => props.function(evt)}>
            {props.buttonTitle}
        </ButtonBase>
    </div>
);

interface CheckPanelInterface {
    title: string,
    aria: string,
    checkValue: boolean,
    function: any,
}

const CheckPanel:FunctionComponent<any> = (props:CheckPanelInterface):ReactElement<any> => (
    <div>
        <p>{props.title}</p>
        <Checkbox
            className="check"
            checked={props.checkValue}
            onChange={() => props.function()}
            value={props.aria}
        />
    </div>
)

interface LinkInterface {
    title: string,
    buttonTitle: string,
    link: string,
}

const LinkPanel:FunctionComponent<any> = (props:LinkInterface):ReactElement<any> => (
    <div>
        <p>{props.title}</p>
        <a className="link-panel-button" href="https://api.opener.mystiar.com">
            <ButtonBase className="setting-button">
                {props.buttonTitle}
            </ButtonBase>
        </a>
    </div>
)

const Settings:FunctionComponent<any> = ():ReactElement<null> => {
    const [blurDashboard, setBlurDashboard] = useState<boolean | any>(false),
        [blurPreview, setBlurPreview] = useState<boolean | any>(false),
        [dontSaveHistory, setdontSaveHistory] = useState<boolean | any>(false),
        [showLoading, setShowLoading] = useState<boolean | any>(false);

    let isAndroid = /(android)/i.test(navigator.userAgent);

    useEffect(() => {
        openerIDB.table("settings").where("title").equals("blurDashboard").toArray((data:any) => {
            setBlurDashboard(data[0].value);
        }).catch((err:any) => {
            openerIDB.table("settings").put({
                title: "blurDashboard",
                value: false
            });
        });

        openerIDB.table("settings").where("title").equals("blurPreview").toArray((data:any) => {
            setBlurPreview(data[0].value);
        }).catch((err:any) => {
            openerIDB.table("settings").put({
                title: "blurPreview",
                value: false
            });
        });

        openerIDB.table("settings").where("title").equals("dontSaveHistory").toArray((data:any) => {
            setdontSaveHistory(data[0].value);
        }).catch((err:any) => {
            openerIDB.table("settings").put({
                title: "dontSaveHistory",
                value: false
            });
        });
    }, []);

    const saveBlurDashboard = () => {
        openerIDB.table("settings").where("title").equals("blurDashboard").toArray((data:any) => {
            openerIDB.table("settings").put({
                title:"blurDashboard",
                value:!data[0].value
            });
            setBlurDashboard(!data[0].value);
        }).catch((err:any) => {
            openerIDB.table("settings").put({
                title: "blurDashboard",
                value: false
            });
        });
    }

    const saveBlurPreview = () => {
        openerIDB.table("settings").where("title").equals("blurPreview").toArray((data:any) => {
            openerIDB.table("settings").put({
                title: "blurPreview",
                value: !data[0].value
            });
            setBlurPreview(!data[0].value);
        }).catch((err:any) => {
            openerIDB.table("settings").put({
                title: "blurPreview",
                value: false
            });
        });
    }

    const saveDontSaveHistory = () => {
        openerIDB.table("settings").where("title").equals("dontSaveHistory").toArray((data:any) => {
            openerIDB.table("settings").put({
                title: "dontSaveHistory",
                value: !data[0].value
            });
            setdontSaveHistory(!data[0].value);
        }).catch((err:any) => {
            openerIDB.table("settings").put({
                title: "dontSaveHistory",
                value: false
            });
        });
    }

    const addToHomescreen = () => {
        let deferredPrompt;

        window.addEventListener('beforeinstallprompt', (e:any) => {
            e.preventDefault();

            deferredPrompt = e;
            deferredPrompt.prompt();

            deferredPrompt.userChoice.then((choiceResult:any) => {
                deferredPrompt = null;
            });
        });
    }

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
        <div id="pages">
            {showLoading ? <Loading instant /> : null}
            <div id="settings">
                <div className="setting-card">
                    <h1>Privacy</h1>

                    <CheckPanel
                        title="Blur an preview image on dashboard"
                        checkValue={blurDashboard}
                        function={() => saveBlurDashboard()}
                        aria="Set blur dashboard"
                    />
                    <CheckPanel
                        title="Blur an preview image on redirect's image preview"
                        checkValue={blurPreview}
                        function={() => saveBlurPreview()}
                        aria="Set save history"
                    />
                    <CheckPanel
                        title="Don't save read history"
                        checkValue={dontSaveHistory}
                        function={() => saveDontSaveHistory()}
                        aria="Set save history"
                    />

                </div>
                <div className="setting-card">

                    <h1>Progressive</h1>
                    {isAndroid && !window.matchMedia('(display-mode: standalone)').matches ?
                        <ButtonPanel 
                            title="Add to homescreen"
                            buttonTitle="Add"
                            function={() => addToHomescreen()} 
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
    )
}

export default Settings