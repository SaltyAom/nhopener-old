import React, {
    useContext,
    FunctionComponent,
    ReactElement,
    useState,
    useEffect
} from 'react'
import {
    Link,
    ButtonBase,
    storeContext,
    openerIDB,
} from '../bridge'
import { ListItem } from '@material-ui/core'
import '../../assets/css/nav.css'

const Nav:FunctionComponent<any> = (props: any):ReactElement<any> => {
    const dispatch:any = useContext(storeContext),
        [searchQuery, setSearchQuery] = useState<string | any>(""),
        [searchResult, setSearchResult] = useState<object | any>([]);
    let query:string = "";

    const toggleMenu:any = ():void => {
        dispatch({
            type: "toggleMenu",
            toggleMenu: !props.store.toggleMenu
        })
    }

    const typeTimeout = (evt:any) => {
        let tempQuery:string = evt.target.value;
        query = tempQuery.toLowerCase();
        setTimeout(() => {

            if(tempQuery.toLowerCase() === query){
                setSearchQuery(searchQuery);
                let tempHistory = [];
                openerIDB.table("history").toArray(collection => {

                    let fetchHistory:Promise<boolean> = new Promise((resolve, reject) => {
                        collection.some((data:any, index:number):any => {
                            let keyword = data.title.toLowerCase();

                            if(keyword.includes(query)){
                                if(tempHistory[0] !== undefined){
                                    tempHistory.some((tempData,index) => {
                                        if(tempData == data.title){
                                            return true
                                        }
                                        if(tempHistory.length - 1 === index) tempHistory.push(data);
                                    });
                                } else {
                                    tempHistory.push(data);
                                }
                            }
                            if(tempHistory.length >= 6 || collection.length - 1 === index){
                                resolve(true);
                                return true;
                            }
                        });
                    });

                    fetchHistory.then(() => {
                        if(query === ""){
                            unFocusSearchbar();
                        } else {
                            if(tempHistory[0] !== undefined){
                                // Storiy found
                                setSearchResult(tempHistory);
                            } else {
                                // Story not found
                                setSearchResult(false);
                            }
                        }
                    });

                });

            }

        },625);
    }

    const unFocusSearchbar = () => {
        setSearchResult([]);
    }

    return(
        <nav id="nav">
            <div className="nav-section" style={{justifyContent:"flex-start"}}>
                <a id="nav-menu" className="material-icons" onClick={() => toggleMenu()}>menu</a>
                <Link id="nav-title" to="/">
                    Opener
                    <sup id="nav-title-sup">Pro</sup>
                </Link>
            </div>
            <div className="nav-section">
                <form id="search">
                    <i id="search-icon" className="material-icons">search</i>
                    <input
                        autoComplete="off"
                        onChange={(evt) => typeTimeout(evt)}
                        id="search-box"
                        type="text"
                        placeholder="Search from history" 
                    />
                    <ButtonBase id="search-go-wrapper">
                        <i id="search-go" className="material-icons">chevron_right</i>
                    </ButtonBase>
                    {searchResult[0] !== undefined ?
                        <>
                            <div id="search-result-container">
                                {searchResult.map(data =>
                                    <Link className="search-result" key={Math.random()} onClick={() => unFocusSearchbar()} to={`/redirect/${data.link}`}>
                                        <ListItem button>{data.title}</ListItem>
                                    </Link>
                                )}
                            </div>
                            <div id="search-overlay" onClick={() => unFocusSearchbar()}></div>
                        </>
                    : null }
                    {searchResult === false ? 
                        <>
                            <div id="search-result-container">
                                <ListItem button>Not found</ListItem>
                            </div>
                            <div id="search-overlay" onClick={() => unFocusSearchbar()}></div>
                        </>
                    : null }
                </form>
            </div>
            <div className="nav-section" style={{justifyContent:"flex-end"}}>
            </div>
        </nav>
    )
}

export default Nav;