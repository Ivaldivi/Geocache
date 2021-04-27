import React from 'react';
import TestRenderer from 'react-test-renderer';
import Victory from '../components/Victory';


test('renders correctly', () => {
    const tree = TestRenderer.create(<Victory location={{ latitude: 44.934412433560745, longitude: -93.1777188451171 }}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });