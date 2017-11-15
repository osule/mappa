import React from 'react';
import sinon from 'sinon';

import { shallow } from 'enzyme';

import { MapView } from '../index';

describe('<MapView />', () => {
  it('should render a google map', () => {
    const LatLngBounds = () => {};
    LatLngBounds.prototype.getCenter = () => ({ lat: () => 10, lng: () => 20 });
    LatLngBounds.prototype.extend = () => {};
    window.google = {
      maps: {
        LatLngBounds,
        LatLng: sinon.stub(),
        Point: sinon.stub(),
        geometry: {
          spherical: {
            computeHeading: () => 45,
          },
        },
      },
    };
    const markers = {};
    const renderedComponent = shallow(
      <MapView
        initializeMarkers={() => {}}
        markers={markers}
      />
    );

    expect(renderedComponent).toMatchSnapshot();
  });
});
