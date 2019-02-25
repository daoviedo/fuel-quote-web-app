import React, { Component } from "react";
import { Button, Nav, NavDropdown, Navbar, Form, FormControl } from 'react-bootstrap';
import './nav_bar.css';

export default class Home extends Component {
    render() {
        return (
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="#home"><h4>Devry Energy</h4></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/"><h5>Home</h5></Nav.Link>
                        <Nav.Link href="/login"><h5>Log-in</h5></Nav.Link>
                        <Nav.Link href="/userlist"><h5>Admin</h5></Nav.Link>
                    </Nav>
                    <NavDropdown title="My Account" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/manage_account">Edit Profile</NavDropdown.Item>
                        <NavDropdown.Item href="/fuel_history">Quote History</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/">Log out</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
