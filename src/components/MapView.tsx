import { useEffect, useRef, useState } from "react";
import ReactGA from "react-ga";
import { divIcon, DivIcon, Map as LeafletMap } from "leaflet";
import {
  MapContainer,
  LayersControl,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import GeoIP from "./GeoIP";
import { MAP_JSON_ENDPOINT, GEOIP_ENDPOINT } from "../config/AppConfig";

import "leaflet/dist/leaflet.css";
import {
  GeoIpMarkerProps,
  GeoIpProps,
  MapInfo,
  MapLayerInfo,
  MapMarkerInfo,
} from "../types";

const GeoIpMarker = (props: GeoIpMarkerProps) => {
  const { icon, geoIP, map } = props;
  const popupRef = useRef<any | null>(null);
  const [refReady, setRefReady] = useState(false);
  map?.flyTo([geoIP.lat, geoIP.lon]);

  ReactGA.event({
    category: "Map Page",
    action: "Map loaded",
    label: "Geolocation",
  });

  useEffect(() => {
    if (popupRef.current) {
      popupRef.current._source.openPopup();
    }
  }, [refReady]);

  return geoIP.lat === null ? null : (
    <Marker draggable={false} position={[geoIP.lat, geoIP.lon]} icon={icon}>
      <Popup
        ref={(ref) => {
          popupRef.current = ref as any;
          setRefReady(true);
        }}
      >
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
    </Marker>
  );
};

/**
 * Map View Component configured via JSON
 *
 * @version 2.0.0
 * @author Nyla Khalil
 */
export default function MapView() {
  const [geoIP, setGeoIP] = useState<GeoIpProps | null>(null);
  const [map, setMap] = useState<LeafletMap | null>(null);
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
      .then((data) => {
        setMapInfo(data);
      })
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

  function getMarkerIcon(iconName: string, iconColor: string): DivIcon {
    let htmlText = '<i class="fa fa-NAME fa-lg" style="color: COLOR;" />';
    htmlText = htmlText.replace(/COLOR/g, iconColor);
    htmlText = htmlText.replace(/NAME/g, iconName);

    return divIcon({
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

  const mapCenter: L.LatLngExpression =
    geoIP && geoIP.lat && geoIP.lon ? [geoIP.lat, geoIP.lon] : mapInfo.center;

  return (
    <MapContainer
      center={mapCenter}
      zoom={mapInfo.zoom}
      whenCreated={(m: LeafletMap) => {
        setMap(m);
      }}
    >
      <LayersControl position="topright">
        {mapInfo.baselayers.map((layer: MapLayerInfo) => getBaselayers(layer))}
      </LayersControl>

      {mapInfo.markers.map((marker: MapMarkerInfo) => getMarkers(marker))}

      {mapCenter && geoIP && (
        <GeoIpMarker
          map={map}
          geoIP={geoIP}
          icon={getMarkerIcon("location-arrow", "tomato")}
        />
      )}
    </MapContainer>
  );
}
