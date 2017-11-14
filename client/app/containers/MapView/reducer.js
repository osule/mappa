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
  DEREGISTER_VEHICLE,
} from './constants';

const initialState = fromJS({
  markers: fromJS({}),
});

function mapViewReducer(state = initialState, action) {
  let keyPath;
  let newState;
  switch (action.type) {
    case INITIALIZE_MARKERS_SUCCESS:
      return state
        .set('markers', fromJS(action.markers));
    case UPDATE_LOCATION_SUCCESS:
      const batch = action.batch
      batch.forEach((vehicle) => {
        console.log('substate id:', vehicle);
        keyPath = ['markers', vehicle.id, 'locations'];
        newState = state.setIn(keyPath, (state.getIn(keyPath) || List()).push(vehicle));
      });
      return newState;
    case DEREGISTER_VEHICLE:
      keyPath = ['markers', action.payload.id];
      return state.deleteIn(keyPath);
    case BATCH_UPDATE_LOCATION:
      return state.set('batch', (state.get('batch') || List()).push(fromJS(action.payload)));
    case BATCH_UPDATE_LOCATION_SUCCESS:
      return state.set('batch', List());
    default:
      return state;
  }
}

export default mapViewReducer;
