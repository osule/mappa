/**
 *
 * MapView
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeMapCenter, makeIcon } from 'utils/map';
import makeSelectMapView from './selectors';
import reducer from './reducer';
import saga from './saga';
import { initializeMarkers } from './actions';


export class MapView extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.initializeMarkers();
  }
  render() {
    const google = window.google;
    const { markers } = this.props;

    if (markers.length === 0) return null;

    const singleLocationMarkers = Object.keys(markers).map((key) => {
      const locations = markers[key].locations;
      const lastLocationIndex = locations.length - 1;
      const position = locations.slice(lastLocationIndex)[0];
      return {
        id: key,
        ...markers[key],
        position,
      };
    });

    const center = makeMapCenter(google, singleLocationMarkers);

    const vehicleMarkers = singleLocationMarkers.map(({ position, locations, id }) => (
      <Marker
        position={{ lat: position.lat, lng: position.lng }}
        key={id}
        icon={makeIcon(google, locations)}
      />
    ));

    return (
      <div>
        <GoogleMap
          center={center}
          defaultZoom={12}
        >
          {vehicleMarkers}
        </GoogleMap>
      </div>
    );
  }
}

MapView.propTypes = {
  markers: PropTypes.object,
  initializeMarkers: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  markers: makeSelectMapView(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeMarkers: () => dispatch(initializeMarkers()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'mapView', reducer });
const withSaga = injectSaga({ key: 'mapView', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDWY26Jc7-43Olb7cSydbcNQ7Lb0OqRb6Y&v=3.exp&libraries=geometry,drawing',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100vh' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(MapView);
