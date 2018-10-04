import React from 'react';
import renderer from 'react-test-renderer';

import { SearchForm } from './SearchForm';

test('SearchForm renders the search form', () => {
  const component = renderer.create(
    <SearchForm />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('SearchForm renders the search form with a query already entered', () => {
  const query = "my query"
  const component = renderer.create(
    <SearchForm query={query} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
