import React, {
    FunctionComponent,
    ReactElement
} from 'react'
import '../../assets/css/loading.css'

const Loading:FunctionComponent<any> = (props: any):ReactElement<any> => {
    if(props.type === "transparent") return (
        <div id="loadscreen" style={{backgroundColor: "transparent"}}>
            <div className="loader">
                <svg className="circular" viewBox="25 25 50 50">
                    <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
                </svg>
                <svg className="circular circular-shadow" viewBox="25 25 50 50">
                    <circle className="path path-shadow" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
                </svg>
                <a id="reload-button" onClick={() => document.location.reload()}>Reload?</a>
            </div>
        </div>
    )
    if(props.type === "overlay") return (
        <div id="loadscreen" style={{backgroundColor: "rgba(0,0,0,.725)"}}>
            <div className="loader">
                <svg className="circular" viewBox="25 25 50 50">
                    <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
                </svg>
                <svg className="circular circular-shadow" viewBox="25 25 50 50">
                    <circle className="path path-shadow" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
                </svg>
                <a id="reload-button" onClick={() => document.location.reload()}>Reload?</a>
            </div>
        </div>
    )
    if(props.instant) return (
        <div id="loadscreen-instant">
            <div className="loader">
                <svg className="circular" viewBox="25 25 50 50">
                    <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
                </svg>
                <svg className="circular circular-shadow" viewBox="25 25 50 50">
                    <circle className="path path-shadow" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
                </svg>
                <a id="reload-button">Reload?</a>
            </div>
        </div>
    )
    return (
        <div id="loadscreen">
            <div className="loader">
                <svg className="circular" viewBox="25 25 50 50">
                    <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
                </svg>
                <svg className="circular circular-shadow" viewBox="25 25 50 50">
                    <circle className="path path-shadow" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
                </svg>
                <a id="reload-button" onClick={() => document.location.reload()}>Reload?</a>
            </div>
        </div>
    )
}

export default Loading;