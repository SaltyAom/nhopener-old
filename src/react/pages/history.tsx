import {
    React,
    useState,
    useEffect,
    Link,
    openerIDB
} from '../bridge'
import { 
    IconButton,
    Checkbox,
    Menu,
    MenuItem
} from '@material-ui/core'

import '../../assets/css/history.css'

interface historyProps {
    id: number,
    title: string,
    removeHistory: any,
    link: number
}

const HistoryList = (props:historyProps) => {
    const [popup, setPopup] = useState(false),
        [attachmentElement, setAttachmentElement] = useState(null),
        [checkValue, setCheckValue] = useState(false);

    const toggleCheck = ():void => {
        setCheckValue(!checkValue);
    }

    const showPopup = (evt:any):void => {
        setAttachmentElement(evt.currentTarget);
        setPopup(true);
    }
    
    return(
        <div className="history-list">
            <Checkbox
                className="check"
                checked={checkValue}
                onChange={() => toggleCheck()}
                value="checkedA"
            />
            <Link to={`/redirect/${props.link}`} className="history-name">{props.title}</Link>
            <IconButton
                className="history-selector"
                aria-owns={popup ? 'History management' : undefined}
                aria-haspopup="true"
                onClick={(evt:any) => showPopup(evt)}
            >
                <i className="material-icons">more_vert</i>
            </IconButton>
            <Menu 
                className="history-popup-menu"
                anchorEl={attachmentElement} 
                open={popup}
                onClose={() => setPopup(false)}
            >
                <MenuItem onClick={() => props.removeHistory(props.id)}>Remove</MenuItem>
            </Menu>
        </div>
    )
}

interface historyType {
    id:number,
    title:string,
    link:number,
    timestamp:any
}

export default () => {
    const [history, setHistory]:any = useState("");

    const removeHistory = async (id:number) => {
        console.log(id);
        await openerIDB.table("history").where("id").equals(id).delete();
        openerIDB.table("history").orderBy("id").reverse().toArray((historyData:Array<historyType>) => {
            setHistory(historyData);
        });
    }

    useEffect(() => {
        openerIDB.table("history").orderBy("id").reverse().toArray((historyData:Array<historyType>) => {
            setHistory(historyData);
        });
    },[]);

    if(history[0] !== undefined){
        return(
            <div id="pages">
                <div id="history-container">
                    {history.map((history:historyType) => 
                        <HistoryList 
                            key={history.id} 
                            id={history.id} 
                            link={history.link}
                            title={history.title} 
                            removeHistory={(id:number) => removeHistory(id)} 
                        />
                    )}
                </div>
            </div>
        )
    } else {
        return(
            <div id="pages">
                <section id="history-container-blank">
                    <p className="history-name">No history found</p>
                </section>
            </div>
        )
    }
}