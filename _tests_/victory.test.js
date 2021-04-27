import React from 'react';
import TestRenderer from 'react-test-renderer';
import Victory from '../components/Victory';

describe("<Victory />", () => {
    it('has 1 child', () => {
        const tree = TestRenderer.create(<Victory location={{ latitude: 44.934412433560745, longitude: -93.1777188451171 }}/>).toJSON();
        expect(tree.children.length).toBe(1);
    });
});

test('renders correctly', () => {
    const tree = TestRenderer.create(<Victory location={{ latitude: 44.934412433560745, longitude: -93.1777188451171 }}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });