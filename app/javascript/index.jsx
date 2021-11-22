import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import { fetchFoods } from './oxalates/actions';
import oxalates from './oxalates/reducers'
import { Oxalates } from './oxalates/index';

const loggerMiddleware = createLogger();
// window.initialState is set in the layout
const store = createStore(
  oxalates,
  oxalates(window.initialState, {}),
  applyMiddleware(thunkMiddleware, loggerMiddleware),
)
store.dispatch(fetchFoods(window.initialState.listMenu.activeListId));

ReactDOM.render(
  <Provider store={store}>
    <Oxalates />
  </Provider>,
  document.getElementById('root'),
);
