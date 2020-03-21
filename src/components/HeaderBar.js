import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import UserProfileCard from './headerbar/UserProfileCard';
import Playlists from './headerbar/Playlists';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Separator = styled.div`
    height: 40px;
    margin: 0 9px;
    border: 1px solid #666;
    margin-left: 25px;
    margin-right: 25px;
`;

const HeaderBar = () => <Container fluid style={{paddingLeft: 0, paddingRight: 0, marginBottom: 10}}>
        <Navbar expand="lg" bg="dark" variant="dark" sticky="top" style={{paddingTop: 0, paddingBottom: 0}}>
            <Navbar.Brand>Spotify Playlist Manager</Navbar.Brand>
            <Nav>
                <Playlists />
            </Nav>
            <Separator></Separator>
            <Nav variant="pills" defaultActiveKey="/library">
                <Nav.Item>
                    <Nav.Link as={Link} to="/library">Library</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/duplicates">Duplicates</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/ool">Out of Library</Nav.Link>
                </Nav.Item>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <UserProfileCard />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
</Container>;

export default HeaderBar;