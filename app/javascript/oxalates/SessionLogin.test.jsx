import React from 'react';
import renderer from 'react-test-renderer';

import { SessionLogin } from './SessionLogin';

test('SessionLogin renders the login button', () => {
  const component = renderer.create(
    <SessionLogin onStartAuthentication={() => {}} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
