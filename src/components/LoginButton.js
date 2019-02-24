import React from 'react'
import { connect } from 'react-redux'

// Presentational Component
const PLoginButton = ({clientId}) => (
    <a href={"https://accounts.spotify.com/authorize?client_id="+clientId+"&redirect_uri=http://localhost:3000&scope=user-read-private%20user-read-email&response_type=token&state=12"}>Log In With Spotify</a>
)

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