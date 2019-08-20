import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin , fa500px } from '@fortawesome/free-brands-svg-icons'

class Footer extends Component {

    render() {
        return (
            <footer id="footer" className="d-flex justify-content-between pl-4 pr-4 pt-2">
                <ul className="list-unstyled list-inline mb-1">
                    <li className="list-inline-item footer-icons">
                        <a href="https://500px.com/nyla" title="500px Profile">
                            <FontAwesomeIcon icon={fa500px} color="Black" />
                        </a>
                    </li>
                    <li className="list-inline-item footer-icons" title="LinkedIn Profile">
                        <a href="https://www.linkedin.com/in/nylakhalil/">
                            <FontAwesomeIcon icon={faLinkedin} color="Black" />
                        </a>
                    </li>
                    <li className="list-inline-item footer-icons" title="GitHub Profile">
                        <a href="https://github.com/nylakhalil">
                            <FontAwesomeIcon icon={faGithub} color="Black" />
                        </a>
                    </li> 
                </ul>
                <p className="small">Copyright &copy; Nyla Khalil {(new Date().getFullYear())}</p>
            </footer>
        );
    }
}
  
export default Footer;