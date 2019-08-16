import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel'

const DATA_ENDPOINT = '/json/photos.json'

class PhotoView extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            images: [],
            interval: null,
            error: {}
        };
    }

    componentDidMount() {
        fetch(DATA_ENDPOINT)
            .then(res => res.json())
            .then((result) => 
                {
                    this.setState({ images: result });
                }, (error) => {
                    this.setState({ error: error });
                }
            ).catch(error => console.error('Error: ', error));
    }

    getCarousel(images, interval) {
       return (
           <div id="photo-view">
               <Carousel interval={interval} indicators={true} controls={false} slide={false} fade={true}>
                    {images.map(image => (
                    <Carousel.Item className="w-100 h-100" key={image.key}>
                        <img src={image.url} alt={image.title} />
                        <Carousel.Caption>
                            <small><a href={image.link} className="text-light">{image.title}</a></small>
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
  
export default PhotoView;