import React, {
    useContext,
    FunctionComponent,
    ReactElement,
    useState
} from 'react'
import {
    Link,
    storeContext,
    openerIDB,
} from '../bridge'
import '../../assets/css/nav.css'

import { RouteComponentProps } from "react-router"
import { withRouter } from "react-router-dom"

type PathParamsType = {
    id: string,
}

type props = RouteComponentProps<PathParamsType> & {
    store: any
}

const Nav:FunctionComponent<any> = (props: props):ReactElement<any> => {
    const dispatch:any = useContext(storeContext),
        [searchQuery, setSearchQuery] = useState<string | any>(""),
        [searchResult, setSearchResult] = useState<object | any>([]),
        [searchQueryPlaceholder, setSearchQueryPlaceholder] = useState<string | any>(""),
        [redirect, setRedirect] = useState<boolean | any>(false);

    let query:string = "";

    const toggleMenu:any = ():void => {
        dispatch({
            type: "toggleMenu",
            toggleMenu: !props.store.toggleMenu
        })
    }

    let typeTimeout = (evt:any) => {
        let tempQuery:string = evt.target.value;
        setSearchQueryPlaceholder(tempQuery);
        query = tempQuery.toLowerCase();
        setTimeout(() => {

            if(tempQuery.toLowerCase() === query){
                setSearchQuery(searchQuery);
                let tempHistory = [];
                openerIDB.table("history").reverse().toArray(collection => {

                    let fetchHistory:Promise<boolean> = new Promise((resolve, reject) => {
                        collection.some((data:any, index:number):any => {
                            let keyword = data.title.toLowerCase();

                            if(keyword.includes(query)){
                                if(tempHistory[0] !== undefined){
                                    tempHistory.some((tempData,index) => {
                                        if(tempData.link === data.link){
                                            return true;
                                        }
                                        if(index === tempHistory.length - 1){
                                            tempHistory.push(data);
                                            return true;
                                        }
                                        return false;
                                    });
                                } else {
                                    tempHistory.push(data);
                                }
                            }
                            if(tempHistory.length >= 6 || collection.length - 1 === index){
                                resolve(true);
                                return true;
                            }
                            return null;
                        });
                    });

                    fetchHistory.then(() => {
                        if(!redirect){
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
                        } else {
                            unFocusSearchbar();
                            setRedirect(false);
                        }
                    });

                });

            }

        },400);
    }

    const unFocusSearchbar = () => {
        setSearchResult([]);
    }

    const toSearch = (evt:any) => {
        evt.preventDefault();
        unFocusSearchbar();
        setRedirect(true);
        props.history.push(`/search/${searchQueryPlaceholder}`);
    }

    return(
        <nav id="nav">
            <div className="nav-section" style={{justifyContent:"flex-start"}}>
                <button id="nav-menu" className="material-icons" onClick={() => toggleMenu()}>menu</button>
                <Link id="nav-title" to="/">
                    Opener
                    <sup id="nav-title-sup">Pro</sup>
                </Link>
            </div>
            <div className="nav-section">
                <form id="search" onSubmit={(evt:any) => toSearch(evt)}>
                    <i id="search-icon" className="material-icons">search</i>
                    <input
                        autoComplete="off"
                        onChange={(evt) => typeTimeout(evt)}
                        id="search-box"
                        type="text"
                        placeholder="Search from history" 
                    />
                    <button id="search-go-wrapper">
                        <i id="search-go" className="material-icons">chevron_right</i>
                    </button>
                    {searchResult[0] !== undefined || searchResult === false ? <div id="search-overlay" onClick={() => unFocusSearchbar()}></div> : null }
                    {searchResult[0] !== undefined ?
                        <div id="search-result-container">
                            {searchResult.map(data =>
                                <Link className="search-result" key={Math.random()} onClick={() => unFocusSearchbar()} to={`/redirect/${data.link}`}>
                                    <div className="search-result-list">{data.title}</div>
                                </Link>
                            )}
                        </div>
                    : null }
                    {searchResult === false ? 
                        <div id="search-result-container">
                            <div className="search-result-list">Not found</div>
                        </div>
                    : null }
                </form>
            </div>
            <div className="nav-section" style={{justifyContent:"flex-end"}}>
            </div>
        </nav>
    )
}

export default withRouter(Nav);