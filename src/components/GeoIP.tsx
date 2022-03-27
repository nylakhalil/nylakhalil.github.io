import { Component } from "react";
import PropTypes from "prop-types";

/**
 * @class GeoIP
 * @classdesc Simple component to display IP and geo location information.
 * @property {number} lat - Latitude (defaults to 0)
 * @property {number} lon - Longtitude (defaults to 0)
 * @property {string} city - City (defaults to Unknown)
 * @property {string} region - Region (defaults to Unknown)
 * @property {string} country - Country (defaults to Unknown)
 * @property {string} ip - IP Address (defaults to Unknown)
 * @property {string} isp - Internet Service Provider name (defaults to Unknown)
 * @version 1.0.0
 * @author Nyla Khalil
 */
export default class GeoIP extends Component {
  static propTypes = {
    lat: PropTypes.number,
    lon: PropTypes.number,
    city: PropTypes.string,
    region: PropTypes.string,
    country: PropTypes.string,
    ip: PropTypes.string,
    isp: PropTypes.string,
  };

  static defaultProps = {
    lat: 0,
    lon: 0,
    city: "Unknown",
    region: "Unknown",
    country: "Unknown",
    ip: "Unknown",
    isp: "Unknown",
  };

  getContent(lat, lon, city, region, country, ip, isp) {
    const coordinates = JSON.stringify([lat, lon]);
    const provider = process.env.REACT_APP_GEOIP_ENDPOINT;

    return (
      <div className="text-center text-muted">
        <p>
          Your location resolved to{" "}
          <span className="font-italic">
            {city}, {region}, {country}
          </span>
          . The geographic coordinates for this location are{" "}
          <span className="font-italic">{coordinates}</span>. The IP Address is{" "}
          <span className="font-italic">{ip}</span> and{" "}
          <span className="font-italic">{isp}</span> is the provider. This
          information was provided by{" "}
          <a href={provider} target="_blank" rel="noopener noreferrer">
            <cite title="Data Provider">{provider}</cite>
          </a>
          .
        </p>
      </div>
    );
  }

  render() {
    const { lat, lon, city, region, country, ip, isp } = this.props;

    return this.getContent(lat, lon, city, region, country, ip, isp);
  }
}
