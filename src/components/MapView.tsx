import { useEffect, useState } from "react";
import ReactGA from "react-ga";
import { Map, LayersControl, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import GeoIP from "./GeoIP";
import { MAP_JSON_ENDPOINT, GEOIP_ENDPOINT } from "../config/AppConfig";

import "leaflet/dist/leaflet.css";
import { GeoIpProps, MapInfo, MapLayerInfo, MapMarkerInfo } from "../types";

const initMarker = (ref: any) => {
  if (ref) {
    ref.leafletElement.openPopup();
  }
};

/**
 * Map View Component configured via JSON
 *
 * @version 2.0.0
 * @author Nyla Khalil
 */
export default function MapView() {
  const [popupMsg, setPopupMsg] = useState<string>("");
  const [latLng, setLatLng] = useState<L.LatLngExpression | null>(null);
  const [geoIP, setGeoIP] = useState<GeoIpProps | null>(null);
  const [mapInfo, setMapInfo] = useState<MapInfo>({
    zoom: 14,
    center: [38.889931, -77.009003],
    baselayers: [],
    markers: [],
  });

  useEffect(() => {
    fetch(MAP_JSON_ENDPOINT)
      .then((response) => {
        return response.json();
      })
      .then((data) => setMapInfo(data))
      .catch((error) => console.error("Map Config Error: ", error));

    if (process.env.NODE_ENV === "production") {
      fetch(GEOIP_ENDPOINT)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const geoProps: GeoIpProps = {
            lat: data.latitude,
            lon: data.longitude,
            city: data.city,
            region: data.region,
            country: data.country,
            ip: data.ip,
            isp: data.org,
          };
          setGeoIP(geoProps);
        })
        .catch((error) => console.error("Location Data Error: ", error));
    }
  }, []);

  function getBaselayers(layer: MapLayerInfo) {
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

  function getMarkerIcon(iconName: string, iconColor: string) {
    let htmlText = '<i class="fa fa-NAME fa-lg" style="color: COLOR;" />';
    htmlText = htmlText.replace(/COLOR/g, iconColor);
    htmlText = htmlText.replace(/NAME/g, iconName);

    return L.divIcon({
      className: "div-icon",
      html: htmlText,
      iconAnchor: [0, 0],
      popupAnchor: [0, 0],
    });
  }

  function getMarkers(marker: MapMarkerInfo) {
    if (marker) {
      const icon = getMarkerIcon(marker.icon, marker.color);
      return (
        <Marker key={marker.id} position={marker.position} icon={icon}>
          <Popup>{marker.text}</Popup>
        </Marker>
      );
    }
  }

  function handleMapClick(event: any) {
    const location = event.latlng
      ? "Lat Lon: " +
        event.latlng["lat"].toFixed(5) +
        ", " +
        event.latlng["lng"].toFixed(5)
      : "Marker Location Error";
    setLatLng(event.latlng);
    setPopupMsg(location);

    ReactGA.event({
      category: "Map Page",
      action: "Selected Marker Location",
      label: "Interaction",
    });
  }

  const mapCenter: L.LatLngExpression =
    geoIP && geoIP.lat && geoIP.lon ? [geoIP.lat, geoIP.lon] : mapInfo.center;

  return (
    <Map center={mapCenter} zoom={mapInfo.zoom} onClick={handleMapClick}>
      <LayersControl position="topright">
        {mapInfo.baselayers.map((layer: MapLayerInfo) => getBaselayers(layer))}
      </LayersControl>

      {mapInfo.markers.map((marker: MapMarkerInfo) => getMarkers(marker))}

      {latLng && (
        <Marker
          position={latLng}
          icon={getMarkerIcon("map-marker", "limegreen")}
          draggable={true}
        >
          <Popup>{popupMsg}</Popup>
        </Marker>
      )}

      {mapCenter && (
        <Marker
          position={mapCenter}
          ref={initMarker}
          icon={getMarkerIcon("location-arrow", "tomato")}
          draggable={false}
        >
          {geoIP && (
            <Popup>
              <GeoIP
                lat={geoIP.lat}
                lon={geoIP.lon}
                city={geoIP.city}
                region={geoIP.region}
                country={geoIP.country}
                ip={geoIP.ip}
                isp={geoIP.isp}
              />
            </Popup>
          )}
        </Marker>
      )}
    </Map>
  );
}
