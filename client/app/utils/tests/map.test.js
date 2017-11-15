/**
 * Test map utils
 */

import sinon from 'sinon';

import { makeIcon, makeMapCenter } from '../map';

describe('map', () => {
  it('should get map center', () => {
    const LatLngBounds = () => {};
    LatLngBounds.prototype.getCenter = () => ({ lat: () => 10, lng: () => 20 });
    LatLngBounds.prototype.extend = () => {};
    const google = {
      maps: {
        LatLngBounds,
        LatLng: sinon.stub(),
        Point: sinon.stub(),
      },
    };
    const markers = [{
      position: {
        lat: 10,
        lng: 20,
      },
    }];
    const spy = sinon.spy(google.maps.LatLngBounds.prototype, 'getCenter');

    makeMapCenter(google, markers);
    expect(spy.called).toBe(true);
  });

  it('should make icon', () => {
    const locations = [
      { lat: 10, lng: 10 },
      { lat: 20, lng: 30 },
    ];
    const heading = 45;
    const google = {
      maps: {
        LatLngBounds: sinon.stub().returns({ getCenter: () => ({ lat: () => 10, lng: () => 20 }), extend: () => {} }),
        LatLng: sinon.stub(),
        Point: sinon.stub(),
        geometry: {
          spherical: {
            computeHeading: () => heading,
          },
        },
      },
    };

    expect(makeIcon(google, locations).rotation).toBe(heading);
  });
});
