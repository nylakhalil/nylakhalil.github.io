import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapView from './MapView';
/**
 * About View Component with description and {@link MapView}
 *
 * @property name
 * @property description
 * @version 1.0.0
 * @author Nyla Khalil
 */
export default class HomeView extends Component {

  static propTypes = {
    name: PropTypes.string,
    description: PropTypes.string
  }

  static defaultProps = {
    name: 'Nyla Khalil',
    description: 'Full Stack Software Engineer',
  }

  render() {
    const { name, description } = this.props;

    return (
      <div id="about" className="flex-grow-1 p-5">
        <div className="jumbotron-fluid">
          <h1 className="display-5">{name}</h1>
          <p className="lead">{description}</p>
        </div>

        <MapView />
      </div>
    );
  }
}
