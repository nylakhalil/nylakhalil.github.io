import { Component } from "react";
import ReactGA from "react-ga";
import { Map, LayersControl, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import GeoIP from "./GeoIP";

import "leaflet/dist/leaflet.css";

const initMarker = ref => {
  if (ref) {
    ref.leafletElement.openPopup()
  }
}

/**
 * Map View Component configured via JSON
 *
 * @version 1.0.0
 * @author Nyla Khalil
 */
export default class MapView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        zoom: 14,
        center: [38.889931, -77.009003],
        baselayers: [],
        markers: [],
      },
      latlng: null,
      popupMsg: "",
      location: {
        latitude: null,
        longitude: null,
        city: null,
        region: null,
        country_name: null,
        ip: null,
        org: null,
      },
    };
    this.handleClick = this.handleClick.bind(this);
  }

  parseLocation(data) {
    if (data) {
      this.setState({
        location: data,
      });
    }
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_MAP_JSON)
      .then((response) => {
        return response.json();
      })
      .then((data) => this.setState({ data: data }))
      .catch((error) => console.error("Map Config Error: ", error));

    fetch(process.env.REACT_APP_GEOIP_ENDPOINT)
      .then((response) => {
        return response.json();
      })
      .then((data) => this.parseLocation(data))
      .catch((error) => console.error("Location Data Error: ", error));
  }

  getBaselayers(layer) {
    if (layer) {
      return (
        <LayersControl.BaseLayer
          checked={layer.on === "true"}
          key={layer.id}
          name={layer.name}
        >
          <TileLayer attribution={layer.attribution} url={layer.url} />
        </LayersControl.BaseLayer>
      );
    }
  }

  getMarkerIcon(iconName, iconColor) {
    let htmlText = '<i class="fa fa-NAME fa-lg" style="color: COLOR;" />';
    htmlText = htmlText.replace(/COLOR/g, iconColor);
    htmlText = htmlText.replace(/NAME/g, iconName);

    return L.divIcon({
      className: "div-icon",
      html: htmlText,
      iconAnchor: [0, 0],
      iconSize: null,
      popupAnchor: [0, 0],
    });
  }

  getMarkers(marker) {
    if (marker) {
      let icon = this.getMarkerIcon(marker.icon, marker.color);
      return (
        <Marker key={marker.id} position={marker.position} icon={icon}>
          <Popup>{marker.text}</Popup>
        </Marker>
      );
    }
  }

  handleClick(e) {
    const location = this.parseLatLng(e.latlng);
    this.setState({ latlng: e.latlng, popupMsg: location });

    ReactGA.event({
      category: "Map Page",
      action: "Selected Marker Location",
      label: "Interaction",
    });
  }

  parseLatLng(latlng) {
    if (!latlng) {
      return "Marker Location Error";
    }

    const lat = latlng["lat"].toFixed(5);
    const lng = latlng["lng"].toFixed(5);
    return "Lat Lon: " + lat + ", " + lng;
  }

  render() {
    let coordinates = null;
    if (this.state.location.latitude && this.state.location.longitude) {
      coordinates = [
        this.state.location.latitude,
        this.state.location.longitude,
      ];
    }
    
    const mapCenter = coordinates ? coordinates : this.state.data.center;

    return (
      <Map
        center={mapCenter}
        zoom={this.state.data.zoom}
        onClick={this.handleClick}
      >
        <LayersControl position="topright">
          {this.state.data.baselayers.map((layer) => this.getBaselayers(layer))}
        </LayersControl>

        {this.state.data.markers.map((marker) => this.getMarkers(marker))}

        {this.state.latlng && (
          <Marker
            position={this.state.latlng}
            icon={this.getMarkerIcon("map-marker", "limegreen")}
            draggable={true}
          >
            <Popup>{this.state.popupMsg}</Popup>
          </Marker>
        )}

        {coordinates && (
          <Marker
            position={coordinates}
            ref={initMarker}
            icon={this.getMarkerIcon("location-arrow", "tomato")}
            draggable={false}
          >
            <Popup>
              <GeoIP
                lat={this.state.location.latitude}
                lon={this.state.location.longitude}
                city={this.state.location.city}
                region={this.state.location.region}
                country={this.state.location.country_name}
                ip={this.state.location.ip}
                isp={this.state.location.org}
              />
            </Popup>
          </Marker>
        )}
      </Map>
    );
  }
}
