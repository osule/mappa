/*
 *
 * MapView actions
 *
 */

import {
  INITIALIZE_MARKERS,
  INITIALIZE_MARKERS_SUCCESS,
  INITIALIZE_MARKERS_ERROR,
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
