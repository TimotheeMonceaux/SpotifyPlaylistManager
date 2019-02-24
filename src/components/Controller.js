import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreator } from '../redux/actions';
import { VLayout, HLayout } from './Layout';
import LoginButton from './LoginButton';
import Loading from './Loading';
import queryString from 'query-string';


// Presentational Component
const PController = ({clientId, userToken, onClientIdFetched, location, onUserTokenInHash}) => {
    if (clientId === "") {
        fetch("/config/spotify.json")
            .then(response => response.json())
            .then(json => onClientIdFetched(json))
            .catch(error => console.log(error));

        return <VLayout><HLayout><Loading /></HLayout></VLayout>;
    }
    if (userToken === "") {
        if (location.hash !== "") {
            var parsed = queryString.parse(location.hash);
            onUserTokenInHash(parsed);
            return <VLayout><HLayout><Loading /></HLayout></VLayout>;
        }
        return <VLayout><HLayout><LoginButton /></HLayout></VLayout>;
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
         onClientIdFetched: (json) => {dispatch(ActionCreator.addClientId(json.clientId))},
         onUserTokenInHash: (json) => {dispatch(ActionCreator.addUserToken(json.access_token))}
    }
}
const Controller = connect(
    mapStateToProps,
    mapDispatchToProps
  )(PController)


export default Controller