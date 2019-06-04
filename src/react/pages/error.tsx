import React,{
    FunctionComponent,
    ReactElement
} from 'react'
import { 
    Link, 
    ButtonBase,
    Helmet
} from '../bridge'

import '../../assets/css/error.css'
import '../../assets/css/button.css'

const Error:FunctionComponent<null> = ():ReactElement<null> => {
    return(
        <>
            <Helmet
                title={"Not found"}
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
            <div id="error">
                <h1>404</h1>
                <p>pages not found...</p>
                <ButtonBase tabIndex={-1} className="button-wrapper">
                    <Link className="button" to="/">
                        Return <i className="material-icons" style={{cursor:"pointer"}}>chevron_right</i>
                    </Link>
                </ButtonBase>
            </div>
        </>
    )
}

export default Error;