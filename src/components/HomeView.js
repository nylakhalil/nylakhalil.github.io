import React, { Component } from 'react'
import MapView from './MapView'

class HomeView extends Component {

    render() {
        return (
            <div id="about" className="p-5">
                <div className="jumbotron-fluid">
                    <h1 className="display-5">Nyla Khalil</h1>
                    <p className="lead">Full Stack Software Engineer</p>
                </div>
                <MapView />
            </div>
        );  
    }           
}
  
export default HomeView;