import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Styled
const StyledLoginButton = styled.a`
    color: white;
    background-color: forestgreen;
    padding: 25px;
    text-decoration: none;
    font-weight: bold;
    border-radius: 20px;
`;

// Presentational Component
const PLoginButton = ({clientId}) => (
    <StyledLoginButton href={"https://accounts.spotify.com/authorize?client_id="+clientId+"&redirect_uri=http://localhost:3000/callback/&scope=user-read-private%20user-read-email%20user-library-read&response_type=token"}>Log In With Spotify</StyledLoginButton>
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