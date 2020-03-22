import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import UserProfileCard from './headerbar/UserProfileCard';
import Playlists from './headerbar/Playlists';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

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
                    <NavLink to="/library" className={getLinkClassName("/library", "/library/")}>Library</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/duplicates" className={getLinkClassName("/duplicates", "/duplicates/")}>Duplicates</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/ool" className={getLinkClassName("/ool", "/ool/")}>Out of Library</NavLink>
                </Nav.Item>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <UserProfileCard />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
</Container>;

function getLinkClassName(expectedPathnames) {
    return [...arguments].filter(pn => pn === window.location.pathname).length >= 1 ? "nav-link active" : "nav-link";
}

export default HeaderBar;