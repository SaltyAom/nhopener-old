/* React */
import React, {
    useState,
    useEffect,
    Fragment
} from 'react'

/* Router */
import { withRouter } from 'react-router-dom'

/* Component */
import HistoryList from '../component/historyList'

/* Bridge */
import {
    openerIDB,
    Link,
    getIDBSetting,
} from '../bridge'

/* CSS */
import '../../assets/css/searchResult.css'

/* View */
const SearchResult = (props) => {
    /* Defination */
    const [searchQuery, setSearchQuery] = useState<string | any>(""),
        [searchResult, setSearchResult] = useState<object | any>([]),
        [blurSearchResult, setBlurSearchResult] = useState<boolean | any>(true);

    /* Effect */
    useEffect(() => {
        (async() => {
            if(props.match.params.id !== undefined){
                setSearchQuery(props.match.params.id);
                retrieveSearch(props.match.params.id);
            }
            setBlurSearchResult(await getIDBSetting("blurSearchResult", false));
        })();
    }, [props.match.params.id]);

    /* Function */
    const SearchSubmit:Function = (evt:any) => {
        evt.preventDefault();

        retrieveSearch(searchQuery);
    }

    const retrieveSearch:Function = (searchQuery):void => {
        /* Create temporary history */
        let tempHistory = [],
        query = searchQuery.toLowerCase();

        /* Retrieve history */
        openerIDB.table("history").reverse().toArray(collection => {

            /* Read History */
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
                    if(tempHistory.length >= 15 || collection.length - 1 === index){
                        resolve(true);
                        return true;
                    }
                    return null;
                });
            });

            /* Set history */
            fetchHistory.then(() => {
                if(searchQuery === ""){
                    /* If searchbar is blank */
                    setSearchResult([]);
                } else {
                    if(tempHistory[0] !== undefined){
                        /* Storiy found */
                        setSearchResult(tempHistory);
                    } else {
                        /* Story not found*/
                        setSearchResult(false);
                    }
                }
            });

        });
    }

    const handleQuery:Function = (evt:any) => {
        if(evt.target.value === "") setSearchResult([]);
        setSearchQuery(evt.target.value);
    }

    return(
        <div id="pages">
            <form id="body-search" onSubmit={(evt) => SearchSubmit(evt)} role="search">

                <i className="material-icons body-search-icon">search</i>
                <input 
                    id="body-searchbar"
                    type="text" 
                    placeholder="Search from history"
                    autoComplete="off"
                    onChange={(evt:any) => handleQuery(evt)}
                    value={searchQuery}
                    aria-labelledby="Search from history"
                />

                <button id="body-search-send" className="body-search-icon">
                    <i id="body-search-send-icon" className="material-icons">chevron_right</i>
                </button>

            </form>

            <div id="body-search-result">
                {searchResult[0] !== undefined ?

                    <Fragment>

                        {searchResult.map((data:any, index:number) =>

                            <Link className="body-search-card-link" key={index} to={`/redirect/${data.link}`}>
                                <div className="body-search-card">

                                    {data.ref ?
                                        <div className="search-card-preview-image-wrapper">
                                            { blurSearchResult ?
                                                <img
                                                    className="search-card-preview-image"
                                                    src={data.ref} 
                                                    alt={data.title}
                                                    style={{filter:"blur(10px)"}}
                                                />
                                                :
                                                <img
                                                    className="search-card-preview-image"
                                                    src={data.ref} 
                                                    alt={data.title}
                                                />
                                            }
                                        </div>
                                    : null }

                                    <div className="body-search-card-body">
                                        <h1 className="body-search-card-title">
                                            {data.title}
                                        </h1>
                                        <footer className="search-card-footer">
                                            <p id="search-card-footer-date" className="search-card-footer-text">Read: {new Date(data.timestamp).toLocaleString()}</p>
                                            <p className="search-card-footer-text">ID: {data.link}</p>
                                        </footer>
                                    </div>

                                </div>

                            </Link>

                        )}
                    </Fragment>
                : null }
                
                {(searchResult === false) && searchQuery !== "" ?
                    <div className="body-search-card">
                        <h1 className="body-search-card-title">
                            <div id="body-search-404" className="body-search-card-body">
                                Not Found
                            </div>
                        </h1>
                    </div>
                    : null
                }

            </div>

            { !searchQuery ? <HistoryList /> : null }

        </div>
    )
}

export default withRouter(SearchResult);