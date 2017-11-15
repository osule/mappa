import { fromJS } from 'immutable';

import {
  selectMapViewDomain,
  selectMapViewBatch,
} from '../selectors';

describe('selectMapViewDomain', () => {
  it('should select mapview state', () => {
    const mapViewState = fromJS({
      markers: {
        abc: {
          id: 'abc',
          locations: [],
        },
      },
    });
    const mockedState = fromJS({
      mapView: mapViewState,
    });

    expect(selectMapViewDomain(mockedState)).toEqual(mapViewState);
  });
});

describe('selectMapViewBatch', () => {
  it('should select mapview batch state', () => {
    const batchState = [{
      id: 'abc',
      locations: [],
    }];
    const mockedState = fromJS({
      mapView: {
        batch: batchState,
      },
    });
    expect(selectMapViewBatch(mockedState)).toEqual(batchState);
  });
});
