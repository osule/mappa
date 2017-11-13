import { call, put, select, takeLatest } from 'redux-saga/effects';

import { INITIALIZE_MARKERS } from 'containers/MapView/constants';
import { initializeMarkersSuccess, initializeMarkersError } from 'containers/MapView/actions';
import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* getVehicles() {
  // Select username from store
  const requestURL = 'http://localhost/vehicles';

  try {
    const markers = yield call(request, requestURL);
    yield put(initializeMarkersSuccess(markers.reduce((prev, memo)=> {prev[memo.id] = memo; return prev; }, {})));
  } catch (err) {
    yield put(initializeMarkersError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* vehicleMarkers() {
  yield takeLatest(INITIALIZE_MARKERS, getVehicles);
}