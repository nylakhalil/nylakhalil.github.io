import { withLeaflet, MapControl } from "react-leaflet";
import L from "leaflet";
import PropTypes from 'prop-types';

/**
 * @class WeatherControl
 * @classdesc Simple component to display weather information.
 * @property {string} forecast - The current weather conditions (defaults to blank)
 * @property {string} temperature - The current temperature and unit (defaults to blank)
 * @property {string} wind - The current wind speed and direction (defaults to blank)
 * @property {string} position - Placement of Weather Control on map (defaults to bottomleft)
 * @version 1.0.0
 * @author Nyla Khalil
*/
class WeatherControl extends MapControl {

  static propTypes = {
    forecast: PropTypes.string,
    temperature: PropTypes.string,
    wind: PropTypes.string,
    position: PropTypes.string
  }

  static defaultProps = {
    forecast: "",
    temperature: "",
    wind: "",
    position: "bottomleft"
  }

  createWeatherHTML() {
    return '<span>' + this.props.temperature + ' ' + this.props.forecast + ' ' + this.props.wind + '</span>';
  }

  createLeafletElement() {
    const WeatherControl = L.Control.extend({
      onAdd: map => {
        this.div = L.DomUtil.create("div", "weather");
        this.div.innerHTML = this.createWeatherHTML();
        return this.div;
      }
    });
    return new WeatherControl({ position: this.props.position });
  }

  componentDidMount() {
    const { map } = this.props.leaflet;
    this.leafletElement.addTo(map);
  }
}

export default withLeaflet(WeatherControl);
