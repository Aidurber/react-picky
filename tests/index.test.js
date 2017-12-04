import React from 'react';
import { shallow } from 'enzyme';
import MyComponent from 'index';

describe('<index />', () => {
  it('renders without crashing', () => {
    shallow(<MyComponent />);
  });
});
