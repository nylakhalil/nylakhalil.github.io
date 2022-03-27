import { Component } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from "prop-types";
import MapView from "./MapView";

/**
 * About View Component with description and {@link MapView}
 *
 * @property name
 * @property description
 * @version 2.0.0
 * @author Nyla Khalil
 */
export default class HomeView extends Component {
  static propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
  };

  static defaultProps = {
    name: "Nyla Khalil",
    description: "Software Engineer",
  };

  render() {
    const { name, description } = this.props;

    return (
      <Box sx={{ flexGrow: 1, p: 5 }}>
        <Typography variant="h4">{name}</Typography>
        <Typography variant="h6">{description}</Typography>
        <MapView />
      </Box>
    );
  }
}
