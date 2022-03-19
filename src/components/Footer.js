import React, { Component } from "react";
import ReactGA from "react-ga";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  fa500px,
} from "@fortawesome/free-brands-svg-icons";

/**
 * Footer Component with Social Icons and Copyright
 *
 * @version 1.0.0
 * @author Nyla Khalil
 */
export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(title) {
    ReactGA.event({
      category: "Site Footer",
      action: "Selected Social Icon: " + title,
      label: "Navigation",
    });
  }

  render() {
    return (
      <footer
        id="footer"
        className="d-flex justify-content-between pl-4 pr-4 pt-2"
      >
        <ul className="list-unstyled list-inline mb-1">
          <li className="list-inline-item footer-icons">
            <a
              href="https://500px.com/nyla"
              title="500px Profile"
              onClick={() => this.handleClick("500px")}
            >
              <FontAwesomeIcon icon={fa500px} color="Black" />
            </a>
          </li>
          <li
            className="list-inline-item footer-icons"
            title="LinkedIn Profile"
            onClick={() => this.handleClick("LinkedIn")}
          >
            <a href="https://www.linkedin.com/in/nylakhalil/">
              <FontAwesomeIcon icon={faLinkedin} color="Black" />
            </a>
          </li>
          <li
            className="list-inline-item footer-icons"
            title="GitHub Profile"
            onClick={() => this.handleClick("GitHub")}
          >
            <a href="https://github.com/nylakhalil">
              <FontAwesomeIcon icon={faGithub} color="Black" />
            </a>
          </li>
        </ul>
        <p className="small">
          Copyright &copy; Nyla Khalil {new Date().getFullYear()}
        </p>
      </footer>
    );
  }
}
