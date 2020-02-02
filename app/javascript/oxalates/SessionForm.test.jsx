import React from 'react';
import renderer from 'react-test-renderer';

import { SessionForm } from './SessionForm';

const password = 'password';

test('SessionForm renders the authentication form', () => {
  const component = renderer.create(
    <SessionForm error={null}
                 password={password}
                 onChangePassword={() => {}}
                 onStopAuthentication={() => {}} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('SessionForm renders the failed authentication form', () => {
  const error = 'some error';
  const component = renderer.create(
    <SessionForm error={error}
                 password={password}
                 onChangePassword={() => {}}
                 onStopAuthentication={() => {}} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
