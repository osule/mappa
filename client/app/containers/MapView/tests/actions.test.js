
import {
  INITIALIZE_MARKERS,
  INITIALIZE_MARKERS_SUCCESS,
  INITIALIZE_MARKERS_ERROR,
  BATCH_UPDATE_LOCATION,
  BATCH_UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_SUCCESS,
  DEREGISTER_VEHICLE,
} from '../constants';

import {
  initializeMarkers,
  initializeMarkersSuccess,
  initializeMarkersError,
  updateLocationSuccess,
  batchUpdateLocation,
  batchUpdateLocationSuccess,
  deregisterVehicle,
} from '../actions';

describe('MapView actions', () => {
  describe('initializeMarkers', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: INITIALIZE_MARKERS,
      };

      expect(initializeMarkers()).toEqual(expectedResult);
    });
  });

  describe('initializeMarkersSuccess', () => {
    it('should return the correct type', () => {
      const markers = {
        abc: {
          id: 'abc',
          locations: [],
        },
      };
      const expectedResult = {
        type: INITIALIZE_MARKERS_SUCCESS,
        markers,
      };

      expect(initializeMarkersSuccess(markers)).toEqual(expectedResult);
    });
  });

  describe('initializeMarkersError', () => {
    it('should return the correct type', () => {
      const error = 'Failed to fetch markers';
      const expectedResult = {
        type: INITIALIZE_MARKERS_ERROR,
        error,
      };

      expect(initializeMarkersError(error)).toEqual(expectedResult);
    });
  });

  describe('updateLocationSuccess', () => {
    it('should return the correct type', () => {
      const batch = [{
        abc: {
          id: 'abc',
          locations: [],
        },
      }];
      const expectedResult = {
        type: UPDATE_LOCATION_SUCCESS,
        batch,
      };

      expect(updateLocationSuccess(batch)).toEqual(expectedResult);
    });
  });

  describe('batchUpdateLocation', () => {
    it('should return the correct type', () => {
      const payload = {
        abc: {
          id: 'abc',
          locations: [],
        },
      };
      const expectedResult = {
        type: BATCH_UPDATE_LOCATION,
        payload,
      };

      expect(batchUpdateLocation(payload)).toEqual(expectedResult);
    });
  });

  describe('batchUpdateLocationSuccess', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: BATCH_UPDATE_LOCATION_SUCCESS,
      };

      expect(batchUpdateLocationSuccess()).toEqual(expectedResult);
    });
  });

  describe('deregisterVehicle', () => {
    it('should return the correct type', () => {
      const payload = {
        id: 'abc',
      };
      const expectedResult = {
        type: DEREGISTER_VEHICLE,
        payload,
      };

      expect(deregisterVehicle(payload)).toEqual(expectedResult);
    });
  });
});
