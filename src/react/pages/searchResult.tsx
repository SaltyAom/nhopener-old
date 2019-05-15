import React, {
    useState,
    useEffect,
    FunctionComponent,
    ReactElement
} from 'react'
import { Helmet } from 'react-helmet'

import {
    openerIDB,
    Link,
    getIDBSetting
} from '../bridge'

import { RouteComponentProps } from "react-router"
import { withRouter } from "react-router-dom"

import '../../assets/css/searchResult.css'

type PathParamsType = {
    id: string,
}

type props = RouteComponentProps<PathParamsType> & {
    store: any
}

const SearchResult:FunctionComponent<any> = (props:props):ReactElement => {
    const [searchQuery, setSearchQuery] = useState<string | any>(""),
        [searchResult, setSearchResult] = useState<object | any>([]),
        [blurSearchResult, setBlurSearchResult] = useState<boolean | any>(true);

    useEffect(() => {
        (async() => {
            if(props.match.params.id !== undefined){
                setSearchQuery(props.match.params.id);
                retrieveSearch(props.match.params.id);
            }
            setBlurSearchResult(await getIDBSetting("blurSearchResult", false));
        })();
    }, [props.match.params.id]);

    const SearchSubmit = (evt:any) => {
        evt.preventDefault();

        retrieveSearch(searchQuery);
    }

    const retrieveSearch = (searchQuery):void => {
        let tempHistory = [],
        query = searchQuery.toLowerCase();

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
                    if(tempHistory.length >= 15 || collection.length - 1 === index){
                        resolve(true);
                        return true;
                    }
                    return null;
                });
            });

            fetchHistory.then(() => {
                if(searchQuery === ""){
                    setSearchResult([]);
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

    const handleQuery = (evt:any) => {
        if(evt.target.value === "") setSearchResult([]);
        setSearchQuery(evt.target.value);
    }

    return(
        <>
            <Helmet
                title={"NHentai Opener"}
                meta={[
                    {
                        name: 'title',
                        content: 'Search result of NHentai Opener'
                    },
                    {
                        name: 'description',
                        content: 'Share your favorite doujinshi hentai safe and securely with code encryption to images with NHentai Opener, a safe and secure platform for reading doujinshi hentai. Alternative for nhentai stories finding.'
                    },
                    {
                        name: 'og:title',
                        content: 'Search result of NHentai Opener'
                    },
                    {
                        name: 'og:description',
                        content: 'Share your favorite doujinshi hentai safe and securely with code encryption to images with NHentai Opener, a safe and secure platform for reading doujinshi hentai. Alternative for nhentai stories finding.'
                    },
                    {
                        name: 'twitter:description',
                        content: 'Share your favorite doujinshi hentai safe and securely with code encryption to images with NHentai Opener, a safe and secure platform for reading doujinshi hentai. Alternative for nhentai stories finding.'
                    }
                ]}
            />
            <div id="pages" className="search-page">
                <form id="body-search" onSubmit={(evt) => SearchSubmit(evt)}>
                    <i className="material-icons body-search-icon">search</i>
                    <input 
                        id="body-searchbar"
                        type="text" 
                        placeholder="Search from history"
                        autoComplete="off"
                        onChange={(evt:any) => handleQuery(evt)}
                        value={searchQuery}
                    />
                    <button id="body-search-send" className="body-search-icon">
                        <i id="body-search-send-icon" className="material-icons">chevron_right</i>
                    </button>
                </form>
                <div id="body-search-result">
                    {searchResult[0] !== undefined ?
                        <>
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
                        </>
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
            </div>
        </>
    )
}

export default withRouter(SearchResult);