import React from 'react';
import ReactGA from 'react-ga';
import { Map, LayersControl, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

/**
 * Map View Component configured via JSON
 *
 * @version 1.0.0
 * @author Nyla Khalil
 */
export default class MapView extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            data: {
                zoom: 14,
                center: [38.889931, -77.009003],
                baselayers: [],
                markers: []
            },
            latlng: null,
            popupMsg: ''
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_MAP_JSON)
            .then(response => { return response.json() })
            .then(data =>  this.setState({data: data}) )
            .catch(error => console.error('Error: ', error));
    }

    getBaselayers(layer) {
        if (layer) {
            return (
                <LayersControl.BaseLayer checked={layer.on === 'true'} key={layer.id} name={layer.name}>
                    <TileLayer attribution={layer.attribution} url={layer.url} />
                </LayersControl.BaseLayer>
            );
        }
    }

    getMarkerIcon(iconName) {
        let htmlText = '<i class="fa fa-{}" />'.replace('{}', iconName);
        return L.divIcon({
            className:'div-icon',
            html: htmlText,
            iconAnchor:[0,0],
            iconSize:null,
            popupAnchor:[0,0]
        });
    }

    getMarkers(marker) {
        if (marker) {
            let icon = this.getMarkerIcon(marker.icon);
            return (
                <Marker key={marker.id} position={marker.position} icon={icon}>
                    <Popup>{marker.text}</Popup>
                </Marker>
            );
        }
    }

    handleClick(e) {
        const location = this.parseLatLng(e.latlng);
        this.setState({ latlng: e.latlng, popupMsg: location});
        
        ReactGA.event({ 
            category: 'Map Page',
            action: 'Selected Marker Location',
            label: 'Interaction'
        });
    }

    parseLatLng(latlng) {
        if (!latlng) {
            return 'Marker Location Error';
        }

        const lat = latlng['lat'].toFixed(5); 
        const lng = latlng['lng'].toFixed(5);
        return 'LatLng: ' + lat + ', ' + lng;
    }

    render() {
        return (
            <Map center={this.state.data.center} zoom={this.state.data.zoom} onClick={this.handleClick}>
                <LayersControl position="topright">
                    {this.state.data.baselayers.map(layer => this.getBaselayers(layer))}
                </LayersControl>
                
                {this.state.data.markers.map(marker => this.getMarkers(marker))}

                { this.state.latlng && 
                <Marker position={this.state.latlng} icon={this.getMarkerIcon('map-marker')} draggable={true}>
                    <Popup>{this.state.popupMsg}</Popup>
                </Marker>}
            </Map>
        );
    }
}
