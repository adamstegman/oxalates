import React from 'react';
import renderer from 'react-test-renderer';

import { SessionMenu } from './SessionMenu';

test('SessionMenu renders the unauthenticated session menu', () => {
  const component = renderer.create(
    <SessionMenu authenticated={false} authenticating={false} password="" />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('SessionMenu renders the authentication form', () => {
  const component = renderer.create(
    <SessionMenu authenticated={false} authenticating={true} password="pass" />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('SessionMenu renders the failed authentication form', () => {
  const error = 'some error';
  const component = renderer.create(
    <SessionMenu authenticated={false} authenticating={true} password="" error={error} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('SessionMenu renders the authenticated session menu', () => {
  const component = renderer.create(
    <SessionMenu authenticated={true} authenticating={false} password="password" />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
