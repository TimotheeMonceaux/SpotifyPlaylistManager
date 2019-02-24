import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

// Presentational Component
const PLoginButton = ({clientId}) => (
    <a href={"https://accounts.spotify.com/authorize?client_id="+clientId+"&redirect_uri=http://localhost:3000/callback/&scope=user-read-private%20user-read-email&response_type=token&state=12"}>Log In With Spotify</a>
)
PLoginButton.propTypes = {
    clientId: PropTypes.string.isRequired
}

// Container Component
const mapStateToProps = state => {
    return {
        clientId: state.clientId
    };
}
const LoginButton = connect(
    mapStateToProps
  )(PLoginButton)

export default LoginButton