import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

class Header extends Component {

    render() {
        return (
            <header id="header">
                <Navbar collapseOnSelect expand="lg">
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Nav.Link eventKey={1} href="/#">About</Nav.Link>
                            <Nav.Link eventKey={2} href="/#/code">Develop</Nav.Link>
                            <Nav.Link eventKey={3} href="/#/photography">Photograpy</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        );
    }
}
  
export default Header;
  