import { useEffect, useRef, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import ReactGA from "react-ga";
import { GeoIpMarkerProps } from "../../types";
import GeoIP from "./GeoIP";

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

export default GeoIpMarker;