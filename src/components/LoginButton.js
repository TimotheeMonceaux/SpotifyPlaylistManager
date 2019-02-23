import React from 'react'

// Presentational Component
const LoginButton = () => (
    <a href="https://accounts.spotify.com/authorize?client_id=&redirect_uri=http://localhost:3000&scope=user-read-private%20user-read-email&response_type=token&state=12">Log In</a>
)

export default LoginButton