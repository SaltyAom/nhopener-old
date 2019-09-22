/* React */
import React from 'react'

/* Redux */
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        store: {

        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: {

        }
    }
}

/* View */
const Preference = ({ store, dispatch }) => {
    return(
        <div id="pages">
            <div id="settings">

            </div>
        </div>
    )
}

export default Preference