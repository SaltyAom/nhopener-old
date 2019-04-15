import React, {
    useState,
    useEffect,
    useContext,
    FunctionComponent,
    ReactElement,
} from 'react'
import {
    Link,
    openerIDB,
    ButtonBase
} from '../bridge'
import { 
    IconButton,
    Checkbox,
    Menu,
    MenuItem
} from '@material-ui/core'

import '../../assets/css/history.css'

const historyContext:any = React.createContext<null>(null);

interface historyProps {
    id: number,
    title: string,
    removeHistory: any,
    link: number,
    value: boolean
}

const HistoryList:FunctionComponent<any> = (props:historyProps):ReactElement => {
    const [popup, setPopup] = useState<boolean | any>(false),
        [attachmentElement, setAttachmentElement] = useState<HTMLElement | any>(null);

    const showPopup = (evt:any):void => {
        setAttachmentElement(evt.currentTarget);
        setPopup(true);
    }
    
    const handleselectedHistory:any = useContext(historyContext);

    return(
        <div className="history-list">
            {props.value !== undefined ?
                <Checkbox
                    className="check"
                    checked={props.value}
                    onChange={() => handleselectedHistory()}
                />
            : 
            <Checkbox
                className="check"
                checked={false}
                onChange={() => handleselectedHistory()}
            />
            }
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

interface tempHistory {
    id: number,
    value: boolean
}

const History:FunctionComponent<null> = ():ReactElement<any> => {
    const [history, setHistory]:any = useState(""),
        [selectedHistory, setSelectedHistory]:any = useState([]),
        [selected, setSelected]:any = useState(false),
        [, updateState] = useState();

    const reloadHistory = ():any => {
        openerIDB.table("history").orderBy("id").reverse().toArray(async (historyData:Array<historyType>) => {
            setHistory(historyData);

            let tempHistory:any = new Array();
            await historyData.forEach(data => {
                tempHistory[data.id] = {id: data.id, value: false};
            });

            let filterHistory:any = tempHistory.filter((data:any) => {
                return data !== null;
            });

            let filterHistoryLength = filterHistory.length - 1;
            filterHistory.every((data:any, index:number) => {
                if(data.value === true){
                    // If one of history is checked
                    setSelected(true);
                    return false
                } else {
                    if(filterHistoryLength === index){
                        setSelected(false);
                        return false;
                    }
                    return true;
                }
            });
            setSelectedHistory(filterHistory);
        });
    }
    
    const removeHistory = async (id:number) => {
        await openerIDB.table("history").where("id").equals(id).delete();
        openerIDB.table("history").orderBy("id").reverse().toArray((historyData:Array<historyType>) => {
            setHistory(historyData);
        });
        reloadHistory();
    }

    const handleselectedHistory = (arrIndex:number, id:number) => {
        let tempHistory:Array<tempHistory> = selectedHistory;

        tempHistory[id] = { id: arrIndex, value: !tempHistory[id].value };

        let filterHistory:Array<tempHistory> = tempHistory.filter((data:any) => {
            return data !== null;
        })
        setSelectedHistory(filterHistory);

        let filterHistoryLength:number = filterHistory.length - 1;

        filterHistory.every((data:any, index:number) => {
            if(data.value === true){
                // If one of history is checked
                setSelected(true);
                return false
            } else {
                if(filterHistoryLength === index){
                    setSelected(false);
                    return false;
                }
                return true;
            }
        });

        updateState(Date.now());
    }

    const cancelAllSelected = ():void => {
        reloadHistory();
    }

    const removeAllSelected = async () => {
        await selectedHistory.forEach((data:any,index:number) => {
            if(data.value === true){
                openerIDB.table("history").where("id").equals(data.id).delete();
            }
        });
        reloadHistory();
    }

    useEffect(() => {
        reloadHistory();
    },[]);

    if(selectedHistory[0] !== undefined){
        return(
            <div id="pages">
                <div id="history-container">
                    {history.map((history:historyType, index:number) => 
                        <historyContext.Provider key={history.id} value={() => handleselectedHistory(history.id, index)}>
                            <HistoryList
                                id={history.id}
                                link={history.link}
                                title={history.title}
                                value={selectedHistory[index].value}
                                removeHistory={(id:number) => removeHistory(id)} 
                            />
                        </historyContext.Provider>
                    )}
                    {selected ?
                    <div id="history-manage">
                        <ButtonBase id="history-manage-cancel" onClick={() => cancelAllSelected()}>Cancel</ButtonBase>
                        <ButtonBase id="history-manage-remove" onClick={() => removeAllSelected()}>Remove all</ButtonBase>
                    </div>
                    : null}
                </div>
            </div>
        )
    } else if(history === "") {
        return(
            <div id="pages">
                <section id="history-container-blank">
                    <p className="history-name">Fetching history...</p>
                </section>
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

export default History;