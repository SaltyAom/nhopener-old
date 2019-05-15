import React, {
    useState,
    useEffect,
    useContext,
    FunctionComponent,
    ReactElement,
    Fragment
} from 'react'
import { 
    storeContext,
    Link,
    Axios,
    openerIDB,
    Helmet
} from '../bridge'
import '../../assets/css/dashboard.css'

interface cardProps {
    overlayTitle?: string,
    image?: string,
    imageType?: string
    title?: string,
    detail?: string,
    footer?: string,
    onClick?: any,
    to?: string,
    blur?: boolean
}

const Card:FunctionComponent<any> = (props: cardProps):ReactElement<any> => {
    let imageType:string;

    switch(props.imageType){
        case "p":
            imageType = "png"
            break;
        case "j":
            imageType = "jpg"
            break;
        default:
            imageType = "jpg"
            break;
    }

    return(
        <Link to={props.to} className="main-card">
            { props.image ?
                <div className="main-card-image-wrapper">
                    <div className="main-card-overlay">
                        <h1 className="main-card-overlay-title">{props.overlayTitle}</h1>
                    </div>
                    { props.blur ?
                        <div className="main-card-image blur" style={{backgroundImage: `url(${props.image}.${imageType})`}}></div>
                    :
                        <div className="main-card-image" style={{backgroundImage: `url(${props.image}.${imageType})`}}></div>
                    }
                </div>
            : null }
            { props.title ?
                <h1 className="main-card-header">{props.title}</h1>
            : null }
            { props.detail ?
                <p className="main-card-detail">
                    {props.detail}
                </p>
            : null }
            {props.footer ?
                <footer className="main-card-footer">
                    <p>{props.footer}</p>
                </footer>
            : null }
        </Link>
    )
}

const Home:FunctionComponent<any> = (props: any):ReactElement<any> => {
    const [blurDashboard, setBlurDashboard]:any = useState<Boolean | any>(true),
        [stories, setStories]:any = useState<any>([]),
        dispatch:any = useContext(storeContext),
        timeout = 20 * 60 * 1000;

    useEffect(() => {
        (async() => {

            openerIDB.table("settings").where("title").equals("blurDashboard").toArray((data:any):void => {
                setBlurDashboard(data[0].value);
            }).catch((err:any):void => {
                openerIDB.table("settings").put({
                    title: "blurDashboard",
                    value: false
                });    
            });

            let visitState:number = Date.now();
            let fetchVisitState:Promise<boolean> = new Promise((resolve, reject) => {

                openerIDB.table("settings").where("title").equals("visitState").toArray(async (data:any) => {
                    visitState = data[0].value;
                    resolve(true);

                }).catch((err:any):void => {
                    openerIDB.table("settings").put({
                        title: "visitState",
                        value: Date.now()
                    });
                    resolve(true);
                });

            });

            await fetchVisitState;

            let randomStoriesID:number = Math.floor(Math.random() * (229345 - 1)) + 1;
            let fetchStoriesID:Promise<boolean> = new Promise(async (resolve, reject) => {

                openerIDB.table("settings").where("title").equals("suggestedStoriesID").toArray(async (data:any) => {
                    if(Date.now() > (visitState + timeout)){
                        await openerIDB.table("settings").put({
                            title: "suggestedStoriesID",
                            value: randomStoriesID
                        });
                        await openerIDB.table("settings").put({
                            title: "visitState",
                            value: Date.now()
                        });
                        resolve(true);
                    } else {
                        randomStoriesID = data[0].value;
                        resolve(true);
                    }

                }).catch(async (err:any) => {
                    openerIDB.table("settings").put({
                        title: "suggestedStoriesID",
                        value: randomStoriesID
                    });
                    resolve(true);
                });

            });

            await fetchStoriesID;

            let fetchStories:Promise<boolean> = new Promise(async (resolve, reject) => {
                openerIDB.table("settings").where("title").equals("suggestedStories").toArray(async (data:any) => {

                    if((!(Date.now() > (visitState + timeout)) && (data[0].value)[0] !== undefined) || navigator.onLine === false){
                        // Stories in IndexedDB exists
                        setStories(data[0].value);
                        resolve(true);
                    } else {
                        // Stories in IndexedEB not exists
                        if(props.store.suggestStories[0] === undefined){
                            // Haven't fetched stories yet
                            Axios(`https://opener.now.sh/api/relate/${randomStoriesID}`).then(async (stories:any) => {
                                dispatch({
                                    type: "newSuggestStories",
                                    suggestStories: stories.data.result
                                });
                                setStories(stories.data.result);
                                await openerIDB.table("settings").put({
                                    title: "suggestedStories",
                                    value: stories.data.result
                                });
                                resolve(true);
                            });
                        } else {
                            // Once fetched
                            setStories(props.store.suggestStories);
                            resolve(true);
                        }
                    }

                }).catch((err:any) => {
                    openerIDB.table("settings").put({
                        title: "suggestedStories",
                        value: []
                    })
                });

            });

            await fetchStories;

        })();
    }, [dispatch, props.store.suggestStories, timeout]);

    if(stories[0] !== undefined){
        return(
            <>
                <Helmet
                    title={"NHentai Opener"}
                    meta={[
                        {
                            name: 'title',
                            content: 'NHentai Opener'
                        },
                        {
                            name: 'description',
                            content: "A safe platform for reading doujinshi's hentai. With hentai encryption on images. Also is an alternative way (also easier and safer) for finding hentai and read hentai with a more secure way."
                        },
                        {
                            name: 'og:title',
                            content: 'NHentai Opener'
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
                <div id="pages">
                    <div id="home-page">
                        <div id="main-dashboard">
                            <div id="main-card-container">
                                <div className="main-card-wrapper">
                                    <Card
                                        title="Hello There!"
                                        detail="Welcome to NHentai Opener 1.3.0.beta.0! You can check more detail at Github"
                                        footer="NHentai Opener 1.3.0.beta.0"
                                        onClick={(e:any) => e.preventDefault()}
                                        to="/"
                                    />
                                    {stories.map((data:any, index:number) => 
                                        <Fragment key={index}>
                                            {index < 2 ?
                                            <Fragment>
                                                <Card
                                                    key={index}
                                                    detail={data.title.english}
                                                    footer={`ID: ${data.id} - ${data.num_pages} pages`}
                                                    image={`https://t.nhentai.net/galleries/${data.media_id}/cover`}
                                                    imageType={data.images.cover.t}
                                                    to={`/redirect/${data.id}`}
                                                    blur={blurDashboard}
                                                />
                                                {index === 1 ?
                                                    <>
                                                        <Card
                                                            key={6}
                                                            title="Encrypt hexcode to image"
                                                            detail="Secure your favourite stories' id with image and share with your friend"
                                                            to="/generate"
                                                        />
                                                        <Card
                                                            key={7}
                                                            title="Decrypt secret code"
                                                            detail="Decrypt secure codes' image to link and read stories"
                                                            to="/drop"
                                                        />
                                                    </>
                                                    : null
                                                }
                                            </Fragment>
                                            : null }
                                        </Fragment>
                                    )}
                                </div>
                                <div className="main-card-wrapper">
                                    {stories.map((data:any, index:number) => 
                                        <Fragment key={index}>
                                            {index >= 2 ?
                                                <>
                                                    <Card
                                                        key={index}
                                                        detail={data.title.english}
                                                        footer={`ID: ${data.id} - ${data.num_pages} pages`}
                                                        image={`https://t.nhentai.net/galleries/${data.media_id}/cover`}
                                                        imageType={data.images.cover.t}
                                                        to={`/redirect/${data.id}`}
                                                        blur={blurDashboard}
                                                    />
                                                    {index === 3 ?
                                                        <Card
                                                            key={8}
                                                            title="Manage what you read"
                                                            detail="Easily view/manage read story's history"
                                                            to="/history"
                                                        />
                                                        : null
                                                    }
                                                </>
                                            : null }
                                        </Fragment>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div id="notify-container">
                            <div id="notify-wrapper">
                                <Card 
                                    title="Beta 1.3" 
                                    detail="Hi there! You're now in beta 1.3.0.beta.1 in-case of you found something new and cool"
                                    to="/"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return(
            <>
                <Helmet
                    title={"NHentai Opener"}
                    meta={[
                        {
                            name: 'title',
                            content: 'NHentai Opener'
                        },
                        {
                            name: 'description',
                            content: "A safe platform for reading doujinshi's hentai. With hentai encryption on images. Also is an alternative way (also easier and safer) for finding hentai and read hentai with a more secure way."
                        },
                        {
                            name: 'og:title',
                            content: 'NHentai Opener'
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
                <div id="pages">
                    <div id="home-page">
                        <div id="main-dashboard">
                            <div id="main-card-container">
                                <div className="main-card-wrapper">
                                    <Card
                                        title="Hello There!"
                                        detail="Welcome to NHentai Opener Alpha test! Hope you find our platform useful!"
                                        footer="NHentai Opener"
                                        onClick={(e:any) => e.preventDefault()}
                                        to="/"
                                    />
                                    <Card
                                        title="Encrypt hexcode to image"
                                        detail="Secure your favourite stories' id with image and share with your friend"
                                        to="/generate"
                                    />
                                    <Card
                                        title="Decrypt secret code"
                                        detail="Decrypt secure codes' image to link and read stories"
                                        to="/drop"
                                    />
                                </div>
                                <div className="main-card-wrapper">
                                    <Card
                                        title="Manage what you read"
                                        detail="Easily view/manage read story's history"
                                        to="/history"
                                    />
                                </div>
                            </div>
                        </div>
                        <div id="notify-container">
                        </div>    
                    </div>
                </div>
            </>
        )
    }
}

export default Home;