import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

class Footer extends Component {

    render() {
        return (
            <footer id="footer" className="d-flex justify-content-between p-4">
                <ul className="list-unstyled list-inline mb-1">
                    <li className="list-inline-item">
                        <a href="https://github.com/nylakhalil">
                            <FontAwesomeIcon icon={faGithub} color="Black" />
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="https://www.linkedin.com/in/nylakhalil/">
                            <FontAwesomeIcon icon={faLinkedin} color="Black" />
                        </a>
                    </li>
                </ul>
                <p className="small pr-4">Copyright &copy; Nyla Khalil {(new Date().getFullYear())}</p>
            </footer>
        );
    }
}
  
export default Footer;