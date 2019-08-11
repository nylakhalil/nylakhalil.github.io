import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ReactWordcloud from 'react-wordcloud'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faObjectGroup, faCode, faCubes, faShieldAlt } from '@fortawesome/free-solid-svg-icons'

const DATA_ENDPOINT = '/json/words.json'

class CodeView extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            data: {
                title: "",
                content: "",
                icons: [
                    { "title": "design", "icon": faObjectGroup },
                    { "title": "develop", "icon": faCode },
                    { "title": "test", "icon": faShieldAlt },
                    { "title": "deploy", "icon": faCubes },
                ]
            },
            words: {},
            options: {
                colors: ['PLUM', 'LIGHTSTEELBLUE', 'YELLOWGREEN', 'LIGHTSALMON'],
                enableTooltip: false,
                fontFamily: 'impact',
                fontSizes: [5, 60],
                fontStyle: 'normal',
                fontWeight: 'normal',
                padding: 1,
                rotations: 3,
                rotationAngles: [0, 90],
                scale: 'sqrt',
                spiral: 'archimedean',
                transitionDuration: 1000,
            }
        };
    }

    componentDidMount() {
        fetch(DATA_ENDPOINT)
          .then(response => { return response.json() })
          .then(data =>  this.setState({words: data}) )
          .catch(error => console.error('Error: ', error));
      }

    getCol(item) {
        return (
            <Col key={item.title}>
                <a href={"#" + item.title} className="icon-circle" onClick={this.setContent.bind(this, item.title)}>
                    <FontAwesomeIcon icon={item.icon} color="black" />
                </a>
                <p class="h4" className="p-1 text-capitalize">{item.title}</p>
            </Col>
        )
    }

    getWorldCloud(title) { 
        if (title === undefined || Object.keys(this.state.words).length === 0) {
            return null;
        }
        const words = this.state.words[title];
        return (
            <div className="word-cloud">
              <ReactWordcloud options={this.state.options} words={words} />
            </div>
        );
    }
    
    setContent(title) {
        this.setState({
            content: title
        });
    }

    render() {
        return (
            <div className="container text-center flex-grow-1 p-5">
                <Row>
                    {this.state.data.icons.map(icon => this.getCol(icon))}
                </Row>

                <div id="#content" className={this.state.content ? 'visible d-flex justify-content-center' : 'invisible'}>
                    {this.getWorldCloud(this.state.content)}
                </div>
            </div>
        );
    }
}
  
export default CodeView;