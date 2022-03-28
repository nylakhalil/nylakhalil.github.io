import { GeoIpProps } from "../types";
import { GEOIP_ENDPOINT } from "../config/AppConfig";

/**
 * JSX Element to display IP address and geo location information.
 *
 * @function GeoIP
 * @property {number} lat - Latitude (defaults to 0)
 * @property {number} lon - Longtitude (defaults to 0)
 * @property {string} city - City (defaults to Unknown)
 * @property {string} region - Region (defaults to Unknown)
 * @property {string} country - Country (defaults to Unknown)
 * @property {string} ip - IP Address (defaults to Unknown)
 * @property {string} isp - Internet Service Provider name (defaults to Unknown)
 * @version 2.0.0
 * @author Nyla Khalil
 */
export default function GeoIP(props: GeoIpProps): JSX.Element {
  const coordinates = JSON.stringify([props.lat, props.lon]);

  return (
    <div className="text-center text-muted">
      <p>
        Your location resolved to{" "}
        <span className="font-italic">
          {props.city}, {props.region}, {props.country}
        </span>
        . The geographic coordinates for this location are{" "}
        <span className="font-italic">{coordinates}</span>. The IP Address is{" "}
        <span className="font-italic">{props.ip}</span> and{" "}
        <span className="font-italic">{props.isp}</span> is the provider. This
        information was provided by{" "}
        <a href={GEOIP_ENDPOINT} target="_blank" rel="noopener noreferrer">
          <cite title="Data Provider">{GEOIP_ENDPOINT}</cite>
        </a>
        .
      </p>
    </div>
  );
}
