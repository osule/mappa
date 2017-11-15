import { fromJS } from 'immutable';

import mapViewReducer from '../reducer';
import {
  initializeMarkersSuccess,
  batchUpdateLocation,
  batchUpdateLocationSuccess,
  updateLocationSuccess,
  deregisterVehicle,
} from '../actions';

describe('mapViewReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      markers: {},
    });
  });

  it('returns the initial state', () => {
    const expectedResult = state;

    expect(mapViewReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the initializeMarkersSuccess action correctly', () => {
    const markers = {
      abc: {
        id: 'abc',
        locations: [],
      },
    };
    const expectedResult = state.set('markers', fromJS(markers));

    expect(mapViewReducer(state, initializeMarkersSuccess(markers))).toEqual(expectedResult);
  });

  it('should handle the updateLocationSuccess action correctly', () => {
    const markers = {
      abc: {
        id: 'abc',
        locations: [],
      },
    };
    const batch = [{
      id: 'abc',
      lat: 10,
      lng: 20,
    }];
    const expectedResult = state.set('markers', fromJS({
      abc: {
        locations: [{ id: 'abc', lat: 10, lng: 20 }],
      },
    }));

    mapViewReducer(state, initializeMarkersSuccess(markers));
    expect(mapViewReducer(state, updateLocationSuccess(batch))).toEqual(expectedResult);
  });

  it('should handle the deregisterVehicle action correctly', () => {
    const markers = {
      abc: {
        id: 'abc',
        locations: [],
      },
    };
    const payload = {
      id: 'abc',
    };
    const expectedResult = state.set('markers', fromJS({}));

    mapViewReducer(state, initializeMarkersSuccess(markers));
    expect(mapViewReducer(state, deregisterVehicle(payload))).toEqual(expectedResult);
  });

  it('should handle the batchUpdateLocation action correctly', () => {
    const marker = {
      id: 'abc',
      locations: [],
    };
    const expectedResult = state.set('batch', fromJS([marker]));

    expect(mapViewReducer(state, batchUpdateLocation(marker))).toEqual(expectedResult);
  });

  it('should handle the batchUpdateLocationSuccess action correctly', () => {
    const marker = {
      id: 'abc',
      locations: [],
    };
    const expectedResult = state.set('batch', fromJS([]));

    mapViewReducer(state, batchUpdateLocation(marker));
    expect(mapViewReducer(state, batchUpdateLocationSuccess())).toEqual(expectedResult);
  });
});
