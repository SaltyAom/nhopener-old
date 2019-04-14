import React, {
    useState,
    useEffect,
    FunctionComponent,
    ReactElement
} from 'react'
import {
    openerIDB
} from '../bridge'
import { Checkbox } from '@material-ui/core'

import '../../assets/css/settings.css'

const Settings:FunctionComponent<any> = ():ReactElement<null> => {
    const [blurDashboard, setBlurDashboard] = useState<boolean | any>(false),
        [dontSaveHistory, setdontSaveHistory] = useState<boolean | any>(false);

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


    return(
        <div id="pages">
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
            </div>
        </div>
    )
}

export default Settings