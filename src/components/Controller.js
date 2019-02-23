import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


// TO REMOVE - BASIC EXAMPLE OF A REDUX COMPONENT'S STRUCTURE

// Presentational Component
const PController = ({clientId, userToken}) => {
    if (clientId === "") {
        // Fetch client id
        return <p>Loading...</p>
    }
    if (userToken === "") {
        return <p>Login</p>
    }
    return <p>Hello, World!</p>
}
PController.propTypes = {
    clientId: PropTypes.string.isRequired,
    userToken: PropTypes.string.isRequired
}

// Container Component
const mapStateToProps = state => {
    return {
        clientId: state.clientId,
        userToken: state.userToken
    };
}
const mapDispatchToProps = dispatch => {
    return {
        // onPCustomButtonClick: () => {dispatch({type:"Hello, World!"})}
    }
}
const Controller = connect(
    mapStateToProps,
    mapDispatchToProps
  )(PController)


export default Controller