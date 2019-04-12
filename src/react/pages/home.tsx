import { 
    React,
    useState,
    useEffect,
    useContext,
    storeContext,
    Link,
    Axios,
    LazyLoad,
    openerIDB
} from '../bridge'
import '../../assets/css/dashboard.css'

interface cardProps {
    overlayTitle?: string,
    image?: string,
    title?: string,
    detail?: string,
    footer?: string,
    onClick?: any,
    to?: string,
    blur?: boolean
}

const Card = (props: cardProps) => (
    <Link to={props.to} className="main-card">
        { props.image ?
            <div className="main-card-image-wrapper">
                <div className="main-card-overlay">
                    <h1 className="main-card-overlay-title">{props.overlayTitle}</h1>
                </div>
                <LazyLoad>
                    { props.blur ?
                    <div className="main-card-image blur" style={{backgroundImage: `url(${props.image})`}}></div>
                    :
                    <div className="main-card-image" style={{backgroundImage: `url(${props.image})`}}></div>
                    }
                </LazyLoad>
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

export default (props: any) => {
    const [blurDashboard, setBlurDashboard]:any = useState(true),
        [random, setRandom]:any = useState([]),
        randomInit:number = Math.floor(Math.random() * (229345 - 1)) + 1,
        dispatch:any = useContext(storeContext);

    useEffect(() => {
        if(props.store.suggestStories[0] === undefined){
            Axios(`https://opener.now.sh/api/relate/${randomInit}`).then((data:any) => {
                dispatch({
                    type: "newSuggestStories",
                    suggestStories: data.data.result
                })
                setRandom(data.data.result);
            });
        } else {
            setRandom(props.store.suggestStories);
        }
        openerIDB.table("settings").where("title").equals("blurDashboard").toArray((data:any) => {
            setBlurDashboard(data[0].value);
        });
    }, []);

    return(
        <div id="pages">
            <div id="home-page">
                <div id="main-dashboard">
                    <div id="main-card-container">
                        <div className="main-card-wrapper">
                            <Card
                                title="Hello There!"
                                detail="Welcome to Opener Pro Alpha test! Hope you find our platform useful!"
                                footer="Opener Pro"
                                onClick={(e:any) => e.preventDefault()}
                            />
                            {random !== [] ?
                                <>
                                    {random.map((data:any, index:number) => 
                                        <>
                                            {index < 2 ?
                                                <>
                                                <Card
                                                    key={index}
                                                    detail={`${data.title.english}`}
                                                    footer={`ID: ${data.id} - ${data.num_pages} pages`}
                                                    image={`https://t.nhentai.net/galleries/${data.media_id}/cover.jpg`}
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
                                            </>
                                            : null }
                                        </>
                                    )}
                                </>
                            : null}
                        </div>
                        <div className="main-card-wrapper">
                            {random !== [] ?
                                <>
                                    {random.map((data:any, index:number) => 
                                        <>
                                            {index >= 2 ?
                                                <>
                                                    <Card
                                                        key={index}
                                                        detail={`${data.title.english}`}
                                                        footer={`ID: ${data.id} - ${data.num_pages} pages`}
                                                        overlayTitle={data.title.pretty}
                                                        image={`https://t.nhentai.net/galleries/${data.media_id}/cover.jpg`}
                                                        to={`/redirect/${data.id}`}
                                                        blur={blurDashboard}
                                                    />
                                                    {index === 3 ?
                                                        <Card
                                                            key={8}
                                                            title="Manage what you read"
                                                            detail="Easily view/manage read story's history"
                                                            to="/generate"
                                                        />
                                                        : null
                                                    }
                                                </>
                                            : null }
                                        </>
                                    )}
                                </>
                            : null}
                        </div>
                    </div>
                </div>
                <div id="notify-container">
                    
                </div>    
            </div>
        </div>
    )
}