import { call, put, select, takeLatest, takeEvery, all} from 'redux-saga/effects';

import { INITIALIZE_MARKERS, UPDATE_LOCATION } from 'containers/MapView/constants';
import {
  batchUpdateLocation,
  batchUpdateLocationSuccess,
  initializeMarkersSuccess,
  initializeMarkersError,
  updateLocationSuccess,
} from 'containers/MapView/actions';
import { selectMapViewBatch } from 'containers/MapView/selectors';
import request from 'utils/request';

/**
 * Get Vehicles request/response handler
 */
export function* getVehicles() {
  // fetch vehicles from backend server and write to store.
  const requestURL = 'http://localhost/vehicles';

  try {
    const markers = yield call(request, requestURL);
    yield put(initializeMarkersSuccess(markers.reduce((prev, memo)=> {prev[memo.id] = memo; return prev; }, {})));
  } catch (err) {
    yield put(initializeMarkersError(err));
  }
}


export function* updateLocation(action) {
  yield put(batchUpdateLocation(action.payload));
  const batch = yield select(selectMapViewBatch);

  if(batch.length === 50) {
    yield put(updateLocationSuccess(batch));
    yield put(batchUpdateLocationSuccess());
  }
}

/**
 * Get map updates request/response handler
 */
 function* vehicleLocationsWatcher() {
 
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* vehicleMarkersWatcher() {
    yield takeLatest(INITIALIZE_MARKERS, getVehicles);
    yield takeEvery(UPDATE_LOCATION, updateLocation);
}