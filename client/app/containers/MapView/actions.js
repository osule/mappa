/*
 *
 * MapView actions
 *
 */

import {
  INITIALIZE_MARKERS,
  INITIALIZE_MARKERS_SUCCESS,
  INITIALIZE_MARKERS_ERROR,
  BATCH_UPDATE_LOCATION,
  BATCH_UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_SUCCESS,
  DEREGISTER_VEHICLE,
} from './constants';


export function initializeMarkers() {
  return {
    type: INITIALIZE_MARKERS,
  };
}

export function initializeMarkersSuccess(markers) {
  return {
    type: INITIALIZE_MARKERS_SUCCESS,
    markers,
  };
}

export function initializeMarkersError(error) {
  return {
    type: INITIALIZE_MARKERS_ERROR,
    error,
  };
}

export function updateLocationSuccess(batch) {
  return {
    type: UPDATE_LOCATION_SUCCESS,
    batch,
  };
}

export function batchUpdateLocation(payload) {
  return {
    type: BATCH_UPDATE_LOCATION,
    payload,
  };
}

export function batchUpdateLocationSuccess() {
  return {
    type: BATCH_UPDATE_LOCATION_SUCCESS,
  };
}

export function deregisterVehicle(payload) {
  return {
    type: DEREGISTER_VEHICLE,
    payload,
  };
}
