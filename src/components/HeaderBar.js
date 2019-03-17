import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import UserProfileCard from './headerbar/UserProfileCard';
import Playlists from './headerbar/Playlists';

const HeaderBar = () => <Container fluid style={{paddingLeft: 0, paddingRight: 0, marginBottom: 10}}>
        <Navbar expand="lg" bg="dark" variant="dark" sticky="top" style={{paddingTop: 0, paddingBottom: 0}}>
            <Navbar.Brand>Spotify Playlist Manager</Navbar.Brand>
            <Nav>
                <Playlists />
                <Nav.Link>Library</Nav.Link>
                <Nav.Link>Duplicates</Nav.Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <UserProfileCard />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
</Container>;

export default HeaderBar;