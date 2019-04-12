import {
    React,
    useState,
    useEffect,
    openerIDB,
} from '../bridge'

import { Checkbox } from '@material-ui/core'

import '../../assets/css/settings.css'

export default () => {
    const [blurDashboard, setBlurDashboard] = useState(false);

    useEffect(() => {
        openerIDB.table("settings").where("title").equals("blurDashboard").toArray((data:any) => {
            setBlurDashboard(data[0].value);
        }).catch((err:any) => {
            openerIDB.table("settings").put({
                title: "blurDashboard",
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
        });
    }

    return(
        <div id="pages">
            <div id="settings">
                <div className="setting-card">
                    <h1>Privacy</h1>
                    <div>
                        <p>Blur an preview image on dashboard</p>
                        { blurDashboard ?
                        <Checkbox
                            className="setting-check"
                            checked={blurDashboard}
                            onChange={() => saveBlurDashboard()}
                            value="checkedA"
                        /> :
                        <Checkbox
                            className="setting-check check"
                            checked={blurDashboard}
                            onChange={() => saveBlurDashboard()}
                            value="checkedA"    
                        />                    
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}