import React from 'react';
import renderer from 'react-test-renderer';

import { SessionLogout } from './SessionLogout';

test('SessionLogout renders the logout button', () => {
  const component = renderer.create(
    <SessionLogout onLogout={() => {}} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
