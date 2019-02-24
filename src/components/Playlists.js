import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Styled
const List = styled.div `
    padding: 25px;
    color: white;
`;
const ListHeader = styled.div`
    font-size: 150%;
    font-weight: bold;
    margin-bottom: 20px;
`;
const StyledPlaylist = styled.div`
    margin-top: 10px;
    margin-left: 10px;
    font-size: 125%;
`;


const PPlaylist = ({playlist}) => <StyledPlaylist><input type="checkbox" defaultChecked={playlist.enabled}/> {playlist.name}</StyledPlaylist>;

// Presentational Component
const PPlaylists = ({userPlaylists}) => (
    <List>
        <ListHeader>My Playlists:</ListHeader>
        {userPlaylists.map((p) => <PPlaylist playlist={p} key={p.id}/>)}
    </List>
);
PPlaylists.propTypes = {
    userPlaylists: PropTypes.array.isRequired
};

// Container Component
const mapStateToProps = state => {
    return {
        userPlaylists: state.userPlaylists
    };
};
const Playlists = connect(
    mapStateToProps
  )(PPlaylists);

export default Playlists;