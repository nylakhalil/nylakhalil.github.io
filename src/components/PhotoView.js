import React, { Component } from 'react';
import ReactGA from 'react-ga';
import Carousel from 'react-bootstrap/Carousel';

/**
 * Bootstrap Carousel Component to render images specified in JSON file.
 *
 * @version 1.0.0
 * @author Nyla Khalil
 */
export default class PhotoView extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            images: [],
            interval: null
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_PHOTOS_JSON)
            .then(res => res.json())
            .then((result) => this.setState({ images: result }))
            .catch(error => console.error('Error: ', error));
    }

    handleClick(title) {
        ReactGA.event({ 
            category: 'Photography Page',
            action: 'Selected Image: ' + title,
            label: 'Navigation'
        });
    }

    getCarousel(images, interval) {
       return (
           <div id="photo-view">
               <Carousel interval={interval} indicators={true} controls={false} slide={false} fade={true}>
                    {images.map(image => (
                    <Carousel.Item key={image.key}>
                        <img className="img-fluid" src={image.url} alt={image.title} />
                        <Carousel.Caption onClick={() => this.handleClick(image.title)}>
                            <a href={image.link} className="text-light">
                                <small>{image.title}</small>
                            </a>
                        </Carousel.Caption>
                    </Carousel.Item>
                    ))}
                </Carousel>
           </div>
       )
    }

    render() {
        const { images, interval } = this.state;
        
        if (images && images.length > 0) {
           return this.getCarousel(images, interval);
        }
        return null
    }
}
