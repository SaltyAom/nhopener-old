/* React */
import React, {
    useState,
    useEffect,
    Fragment
} from 'react'
import { connect } from 'react-redux'

/* Bridge */
import { 
    Link,
    OpenerAPI,
    openerIDB,
    Helmet,
    getIDBSetting
} from '../bridge'
import '../../assets/css/dashboard.css'

/* Type Defination */
interface cardProps {
    overlayTitle?: string,
    image?: string,
    imageType?: string
    title?: string,
    detail?: string,
    footer?: string,
    onClick?: any,
    to?: string,
    blur?: boolean,
    index?: number
}

const mapStateToProps = (state) => {
    return {
        store:{
            suggestStories: state.suggestStories
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        dispatch: {

            newSuggestStories: (newStories) => {
                dispatch({
                    type: "NewSuggestStories",
                    payload: {
                        suggestStories: newStories
                    }
                })
            }

        }
    }
}

/* View */
const Home = ({ store, dispatch }) => {
    /* Connect */
    const { suggestStories } = store
    const { newSuggestStories } = dispatch

    const [blurDashboard, setBlurDashboard] = useState(true),
        [stories, setStories] = useState<any>([]),
        timeout = 20 * 60 * 1000;

    useEffect(() => {
        (async() => {

            // Get Blur settings
            setBlurDashboard(await getIDBSetting("blurDashboard", false));

            // Check last visit time
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

            // Random Hentai
            let randomStoriesID:number = Math.floor(Math.random() * (272339 - 1)) + 1;
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

            // Find new hentai
            let fetchStories:Promise<boolean> = new Promise(async (resolve, reject) => {
                openerIDB.table("settings").where("title").equals("suggestedStories").toArray(async (data:any) => {

                    if((!(Date.now() > (visitState + timeout)) && (data[0].value)[0] !== undefined) || navigator.onLine === false){
                        // Stories in IndexedDB exists
                        console.log(data[0].value);
                        setStories(data[0].value);
                        resolve(true);
                    } else {
                        // Stories in IndexedEB not exists
                        if(suggestStories[0] === undefined){
                            // Haven't fetched stories yet
                            OpenerAPI.getRelate(randomStoriesID).then(async (stories:any) => {
                                newSuggestStories(stories.result)
                                setStories(stories.result);
                                console.log(stories.result);
                                await openerIDB.table("settings").put({
                                    title: "suggestedStories",
                                    value: stories.result
                                });
                                resolve(true);
                            });
                        } else {
                            // Once fetched
                            setStories(suggestStories);
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
    }, [newSuggestStories, suggestStories, timeout]);

    if(stories !== undefined){
        return(
            <Fragment>
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
                                        detail="Welcome to NHentai Opener 1.3.0beta.3! You can check more detail at Github"
                                        footer="NHentai Opener 1.3.0beta.3"
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
                                                        index={index}
                                                    />

                                                    {index === 1 ?
                                                        <Fragment>
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
                                                        </Fragment>
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

                                                <Fragment>
                                                    <Card
                                                        key={index}
                                                        detail={data.title.english}
                                                        footer={`ID: ${data.id} - ${data.num_pages} pages`}
                                                        image={`https://t.nhentai.net/galleries/${data.media_id}/cover`}
                                                        imageType={data.images.cover.t}
                                                        to={`/redirect/${data.id}`}
                                                        blur={blurDashboard}
                                                        index={index}
                                                    />
                                                    
                                                    {index === 2 ? 
                                                        <Card
                                                            key={9}
                                                            title="Set your preference"
                                                            detail="Manage stories' recommendation which will filter on recommended page"
                                                            to="/settings/preference"
                                                        />: null
                                                    }
                                                    {index === 3 ?
                                                        <Card
                                                            key={8}
                                                            title="Manage what you read"
                                                            detail="Easily view/manage read story's history"
                                                            to="/history"
                                                        /> : null
                                                    }
                                                </Fragment>

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
                                    detail="Hi there! You're now in beta 1.3.0beta.3 in-case of you found something new and cool"
                                    to="/"
                                />
                            </div>
                        </div>

                    </div>
                </div>

            </Fragment>
        )
    } else {
        return(
            <Fragment>
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
            </Fragment>
        )
    }
}

/* Sub Component */
const Card = (props: cardProps) => {
    const [intersected, setIntersected] = useState(false);

    /* Effect */
    useEffect(() => {
        if(!props.image) return;
        
        const element = document.getElementById(`main-card-${props.index}`);
        if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window){

            const io = new IntersectionObserver(entries => {
                if(entries[0].isIntersecting && !intersected){
                    setIntersected(true);
                    io.unobserve(entries[0].target);
                }
            });

            io.observe(element);

        } else {
            window.onload = () => {
                setIntersected(true);
            }
        }
        // eslint-disable-next-line
    }, [props.image]);

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
        <Link to={props.to} className="main-card" id={`main-card-${props.index}`}>

            { props.image ?

                <div className="main-card-image-wrapper">
                    <div className="main-card-overlay">
                        <h1 className="main-card-overlay-title">{props.overlayTitle}</h1>
                    </div>
                    { intersected ?
                        <Fragment>
                            { props.blur ?
                                <img className="main-card-image blur" src={`${props.image}.${imageType}`} alt={props.overlayTitle} />
                                :
                                <img className="main-card-image" src={`${props.image}.${imageType}`} alt={props.overlayTitle} />
                            }
                        </Fragment>
                        : <div className="main-card-image"></div>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);