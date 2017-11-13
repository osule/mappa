import { createSelector } from 'reselect';

/**
 * Direct selector to the mapView state domain
 */
const selectMapViewDomain = (state) => state.get('mapView');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MapView
 */

const makeSelectMapView = () => createSelector(
  selectMapViewDomain,
  (substate) => substate.get('markers').toJS(),
);


export default makeSelectMapView;
export {
  selectMapViewDomain,
};
