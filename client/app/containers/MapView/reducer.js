/*
 *
 * MapView reducer
 *
 */

import { fromJS, List } from 'immutable';

import {
  INITIALIZE_MARKERS_SUCCESS,
  UPDATE_LOCATION_SUCCESS,
  BATCH_UPDATE_LOCATION,
  BATCH_UPDATE_LOCATION_SUCCESS,
  SET_OUT_OF_OFFICE,
  SET_OUT_OF_OFFICE_SUCCESS,
  DEREGISTER_VEHICLE,
} from './constants';

const initialState = fromJS({
  markers: fromJS({}),
  outsideOffice: fromJS([]),
});

function mapViewReducer(state = initialState, action) {
  let keyPath;
  switch (action.type) {
    case INITIALIZE_MARKERS_SUCCESS:
      return state
        .set('markers', fromJS(action.markers));
    case UPDATE_LOCATION_SUCCESS:
      return batchUpdate(state, action.batch);
    case DEREGISTER_VEHICLE:
      keyPath = ['markers', action.payload.id];
      return state.deleteIn(keyPath);
    case BATCH_UPDATE_LOCATION:
      return state.set('batch', (state.get('batch') || List()).push(fromJS(action.payload)));
    case BATCH_UPDATE_LOCATION_SUCCESS:
      return state.set('batch', List());
    case SET_OUT_OF_OFFICE:
      return state.set('outsideOffice', state.get('outsideOffice').push(action.payload))
    default:
      return state;
  }
}

const batchUpdate = (state, batch) => {
  let newState;
  let keyPath;
  batch.forEach((vehicle) => {
    keyPath = ['markers', vehicle.id, 'locations'];
    newState = state.setIn(keyPath, (state.getIn(keyPath) || List()).push(fromJS(vehicle)));
  });
  return newState;
};

export default mapViewReducer;
