/*
 *
 * MapView reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INITIALIZE_MARKERS_SUCCESS,
} from './constants';

const initialState = fromJS({
  markers: fromJS({}),
});

function mapViewReducer(state = initialState, action) {
  console.log('action type:', action.type);
  switch (action.type) {
    case INITIALIZE_MARKERS_SUCCESS:
      return state
        .set('markers', fromJS(action.markers));
    default:
      return state;
  }
}

export default mapViewReducer;
