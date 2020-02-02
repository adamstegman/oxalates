import { cssify } from './cssify';

test('cssify converts a list name to a CSS class name', () => {
  expect(cssify('Very High')).toEqual('very-high');
});

test('cssify returns empty string for undefined', () => {
  expect(cssify()).toEqual('');
});
