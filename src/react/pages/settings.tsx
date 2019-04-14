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

const Settings:FunctionComponent<any> = ():ReactElement<null> => {
    const [blurDashboard, setBlurDashboard] = useState<boolean | any>(false),
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

    const savedontSaveHistory = () => {
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

                    <div>
                        <p>Blur an preview image on dashboard</p>
                        <Checkbox
                            className="check"
                            checked={blurDashboard}
                            onChange={() => saveBlurDashboard()}
                            value="Set blur dashboard"
                        />
                    </div>
                    <div>
                        <p>Don't save read history</p>
                        <Checkbox
                            className="check"
                            checked={dontSaveHistory}
                            onChange={() => savedontSaveHistory()}
                            value="Set save history"
                        />
                    </div>

                </div>
                <div className="setting-card">
                    <h1>Progressive</h1>

                    {isAndroid && !window.matchMedia('(display-mode: standalone)').matches ?
                    <div>
                        <p>Add to homescreen</p>
                        <ButtonBase className="setting-button" onClick={() => addToHomescreen()}>
                            Add
                        </ButtonBase>
                    </div> : null
                    }
                    <div>
                        <p>Reload data</p>
                        <ButtonBase className="setting-button" onClick={() => window.location.reload()}>
                            Reload
                        </ButtonBase>
                    </div>
                    <div>
                        <p>Clear all caches (Reload)</p>
                        <ButtonBase className="setting-button" onClick={() => clearCache()}>
                            Clear
                        </ButtonBase>
                    </div>
                    <div>
                        <p>Recache every files</p>
                        <ButtonBase className="setting-button" onClick={() => forceUpdate()}>
                            Force update
                        </ButtonBase>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings