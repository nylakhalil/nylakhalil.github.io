import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

/**
 * Header Component utilizing Bootstrap Navbar with routes
 *
 * @version 1.0.0
 * @author Nyla Khalil
 */
export default class Header extends Component {

    render() {
        return (
            <header id="header">
                <Navbar collapseOnSelect expand="lg">
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Nav.Link eventKey={1} href="/#">About</Nav.Link>
                            <Nav.Link eventKey={2} href="/#/develop">Develop</Nav.Link>
                            <Nav.Link eventKey={3} href="/#/photography">Photography</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        );
    }
}
