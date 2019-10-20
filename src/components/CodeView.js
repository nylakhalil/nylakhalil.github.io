import React, { Component } from 'react';
import ReactGA from 'react-ga';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReactWordcloud from 'react-wordcloud';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faObjectGroup, faCode, faCubes, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

/**
 * Develop View Component configured via JSON
 *
 * @version 1.0.0
 * @author Nyla Khalil
 */
export default class CodeView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      icons: [
        { name: "design", color: "SeaGreen", "icon": faObjectGroup },
        { name: "develop", color: "Black", "icon": faCode },
        { name: "test", color: "Black", "icon": faShieldAlt },
        { name: "deploy", color: "Black", "icon": faCubes }
      ],
      content: {},
      title: "",
      options: {
        colors: ['#B5BABE'],
        enableTooltip: false,
        fontFamily: 'impact',
        fontSizes: [5, 40],
        fontStyle: 'normal',
        fontWeight: 'normal',
        padding: 10,
        rotations: 1,
        rotationAngles: [0, 90],
        scale: 'sqrt',
        spiral: 'archimedean',
        transitionDuration: 1000,
      }
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_DEVELOP_JSON)
      .then(response => { return response.json() })
      .then(data => this.setState({ content: data }))
      .catch(error => console.error('Error: ', error));
  }

  handleClick(title) {
    this.setState({ title: title });
    this.state.icons.forEach(function (icon) {
      if (icon.name === title) {
        icon.color = "SeaGreen"
      } else {
        icon.color = "Black"
      }
    });
    ReactGA.event({
      category: 'Develop Page',
      action: 'Selected Icon: ' + title,
      label: 'Navigation'
    });
  }

  getIconCol(item) {
    return (
      <Col className="text-center" key={item.name}>
        <span className="cursor-pointer icon-circle" onClick={() => this.handleClick(item.name)} title={item.name}>
          <FontAwesomeIcon icon={item.icon} color={item.color} />
        </span>
        <p className="h4 p-1 text-capitalize">{item.name}</p>
      </Col>
    );
  }

  getWorldCloud(words, options) {
    if (!words || Object.keys(words).length === 0) {
      return null;
    }

    return (
      <ReactWordcloud options={options} words={words} />
    );
  }

  getDescription(description) {
    return (
      <blockquote className="mr-5 blockquote pl-5 pt-4">
        <p className="text-muted">
          {description['content']}
        </p>
        <footer className="blockquote-footer text-center">
          <small className="text-muted mr-5">
            <a href={description['link']}>
              <cite title="Source Link">
                {description['source']}
              </cite>
            </a>
          </small>
        </footer>
      </blockquote>
    );
  }

  render() {
    if (!this.state.content || Object.keys(this.state.content).length === 0) {
      return null;
    }
    const title = this.state.title || "design";

    return (
      <div className="d-block p-5">
        <Row className="p-3 d-flex justify-content-between" noGutters={true}>
          {this.state.icons.map(icon => this.getIconCol(icon))}
        </Row>
        <Row className="align-self-start" noGutters={true}>
          <Col className="bg-light">
            {this.getWorldCloud(this.state.content[title]["words"], this.state.options)}
          </Col>
          <Col className="d-none d-lg-block"></Col>
        </Row>
        <Row className="align-self-end" noGutters={true}>
          <Col className="d-none d-lg-block"></Col>
          <Col className="bg-light">
            {this.getDescription(this.state.content[title])}
          </Col>
        </Row>
        <p></p>
      </div>
    );
  }
}
