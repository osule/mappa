import React from 'react';
import { shallow } from 'enzyme';

import MapView from 'containers/MapView';
import HomePage from '../index';


describe('<HomePage />', () => {
  it('should render a view of the map', () => {
    const renderedComponent = shallow(
      <HomePage />
    );
    expect(renderedComponent.contains(
      <MapView />
    )).toEqual(true);
  });
});
