/* React */
import React, {
    useState,
    useEffect,
    Fragment
} from 'react'

/* Material UI */
import { 
    IconButton,
    Checkbox,
    Menu,
    MenuItem
} from '@material-ui/core'

/* Bridge */
import {
    Link,
    openerIDB,
    ButtonBase,
    Helmet
} from '../bridge'

/* CSS */
import '../../assets/css/history.css'

/* Type Defination */
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

/* View */
const History = () => {
    /* Defination */
    const [history, setHistory] = useState<any>(""),
        [selectedHistory, setSelectedHistory] = useState([]),
        [selected, setSelected] = useState(false);

    /* Force update */
    const [, updateState] = useState();

    /* Effect */
    useEffect(() => {
        /* Load history */
        reloadHistory();
    },[]);

    /* Function */
    const reloadHistory:Function = () => {

        /* Fetch History */
        openerIDB.table("history").orderBy("id").reverse().toArray(async (historyData:Array<historyType>) => {

            setHistory(historyData);

            let tempHistory:Array<any> = [];

            /* Fetch History */
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
    
    const removeHistory:Function = async (id:number) => {
        await openerIDB.table("history").where("id").equals(id).delete();

        openerIDB.table("history").orderBy("id").reverse().toArray((historyData:Array<historyType>) => {
            setHistory(historyData);
        });

        reloadHistory();
    }

    const handleSelectedHistory:Function = (arrIndex:number, id:number) => {
        /* Create Temporary History */
        let tempHistory:Array<tempHistory> = selectedHistory;
        tempHistory[id] = { id: arrIndex, value: !tempHistory[id].value };

        let filterHistory:Array<tempHistory> = tempHistory.filter((data:any) => {
            return data !== null;
        });

        /* Select History */
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

        /* Re render */
        updateState(Date.now());
    }

    const removeAllSelected:Function = async () => {
        await selectedHistory.forEach((data:any) => {
            if(data.value === true){
                openerIDB.table("history").where("id").equals(data.id).delete();
            }
        });
        reloadHistory();
    }

    /* View */
    if(selectedHistory[0] !== undefined){
        return(
            <Fragment>
                <Helmet
                    title={"History"}
                    meta={[
                        {
                            name: 'title',
                            content: 'Manage your hentai reading history.'
                        },
                        {
                            name: 'description',
                            content: "A safe platform for reading doujinshi's hentai. With hentai encryption on images. Also is an alternative way (also easier and safer) for finding hentai and read hentai with a more secure way."
                        },
                        {
                            name: 'og:title',
                            content: 'Manage your hentai reading history.'
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

                <Fragment>
                    <div id="history-container">

                        {history.map((history:historyType, index:number) => 
                            <HistoryList
                                key={index}

                                id={history.id}
                                link={history.link}
                                title={history.title}
                                value={selectedHistory[index].value}
                                removeHistory={(id:number) => removeHistory(id)} 
                                function={() => handleSelectedHistory(history.id, index)}                                
                            />
                        )}

                        {selected ?
                            <div id="history-manage">
                                <ButtonBase id="history-manage-cancel" onClick={ () => reloadHistory() }>Cancel</ButtonBase>
                                <ButtonBase id="history-manage-remove" onClick={ () => removeAllSelected() }>Remove all</ButtonBase>
                            </div>
                        : null}

                    </div>
                </Fragment>
                
            </Fragment>
        )
    } else if(history === "") {
        return(
            <section id="history-container-blank">
                <p className="history-name">Fetching history...</p>
            </section>
        )
    } else {
        return(
            <section id="history-container-blank">
                <p className="history-name">No history found</p>
            </section>
        )
    }
}

/* Type Defination */
interface historyProps {
    id: number,
    title: string,
    removeHistory: any,
    link: number,
    value: boolean,
    function: Function
}

/* Sub Component */
const HistoryList = (props:historyProps) => {
    const [popup, setPopup] = useState(false),
        [attachmentElement, setAttachmentElement] = useState<HTMLElement | any>(null);

    const showPopup = (evt:any):void => {
        setAttachmentElement(evt.currentTarget);
        setPopup(true);
    }
    
    /* View */
    return(
        <div className="history-list">

            {props.value !== undefined ?
                <Checkbox
                    className="check"
                    checked={props.value}
                    onChange={() => props.function()}
                />
                : 
                <Checkbox
                    className="check"
                    checked={false}
                    onChange={() => props.function()}
                />
            }

            <Link to={`/redirect/${props.link}`} className="history-name">{props.title}</Link>

            <IconButton
                className="history-selector"
                aria-owns={popup ? 'History management' : undefined}
                aria-haspopup="true"
                onClick={(evt:any) => showPopup(evt)}
            >
                <i className="material-icons history-popup-icon">more_vert</i>
            </IconButton>

            <Menu
                id="history-popup-menu"
                anchorEl={attachmentElement} 
                open={popup}
                onClose={() => setPopup(false)}
            >
                <MenuItem onClick={() => props.removeHistory(props.id)}>Remove</MenuItem>
                <MenuItem><Link to={`/generate/${props.link}`} className="link-menu-item">Generate</Link></MenuItem>
            </Menu>

        </div>
    )
}

export default History