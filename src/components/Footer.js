import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

class Footer extends Component {

    render() {
        return (
            <footer className="fixed-bottom">
                <Row className="justify-content-md-center">
                    <Col>
                        <ul className="list-unstyled list-inline mb-1">
                            <li className="list-inline-item">
                                <a href="https://github.com/nylakhalil">
                                    <FontAwesomeIcon icon={faGithub} color="black" />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="https://www.linkedin.com/in/nylakhalil/">
                                    <FontAwesomeIcon icon={faLinkedin} color="black" />
                                </a>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <p className="text-center small">Copyright &copy; Nyla Khalil {(new Date().getFullYear())}</p>
                </Row>
            </footer>
        );
    }
}
  
export default Footer;