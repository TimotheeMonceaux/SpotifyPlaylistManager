import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreator } from '../redux/actions';
import LoginButton from './LoginButton';


// TO REMOVE - BASIC EXAMPLE OF A REDUX COMPONENT'S STRUCTURE

// Presentational Component
const PController = ({clientId, userToken, onClientIdFetched}) => {
    if (clientId === "") {
        fetch("/config/spotify.json")
            .then(response => response.json())
            .then(json => onClientIdFetched(json))
            .catch(error => console.log(error));

        return <p>Loading...</p>;
    }
    if (userToken === "") {
        return <LoginButton />
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
         onClientIdFetched: (json) => {dispatch(ActionCreator.addClientId(json.clientId))}
    }
}
const Controller = connect(
    mapStateToProps,
    mapDispatchToProps
  )(PController)


export default Controller