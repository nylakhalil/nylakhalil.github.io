import React from 'react'
import { Map, LayersControl, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

import 'leaflet/dist/leaflet.css'

const { BaseLayer } = LayersControl
const DATA_ENDPOINT = '/json/map.json'

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
      latlng: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    this.setState({ latlng: e.latlng });
  }

  componentDidMount() {
    fetch(DATA_ENDPOINT)
      .then(response => { return response.json() })
      .then(data =>  this.setState({data: data}) )
      .catch(error => console.error('Error: ', error));
  }

  getBaselayers(layer) {
    if (layer) {
      return (
        <BaseLayer checked={layer.on === 'true'} key={layer.id} name={layer.name}>
          <TileLayer attribution={layer.attribution} url={layer.url} />
        </BaseLayer>
      )
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
      )
    }
  }

  parseLatLng(latlng) {
    return (
       latlng.lat + ", " + latlng.lng
    )
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
              <Popup>{this.parseLatLng(this.state.latlng)}</Popup>
          </Marker>}
        </Map>
    )
  }
}