import React from 'react'
import '../../assets/css/loading.css'

export default () => {
    return (
        <div id="loadscreen">
            <div className="loader">
                <svg className="circular" viewBox="25 25 50 50">
                    <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
                </svg>
                <svg className="circular circular-shadow" viewBox="25 25 50 50">
                    <circle className="path path-shadow" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
                </svg>
            </div>
        </div>
    )
}