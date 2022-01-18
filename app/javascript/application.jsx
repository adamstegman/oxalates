// Entry point for the build script in your package.json

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { fetchFoods } from './oxalates/actions';
import oxalates from './oxalates/reducers'
import { Oxalates } from './oxalates/index';

// window.initialState is set in the layout
const store = createStore(
  oxalates,
  oxalates(window.initialState, {}),
  applyMiddleware(thunkMiddleware),
)
store.dispatch(fetchFoods(window.initialState.listMenu.activeListId));

ReactDOM.render(
  <Provider store={store}>
    <Oxalates />
  </Provider>,
  document.getElementById('root'),
);
