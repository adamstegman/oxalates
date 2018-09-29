import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import oxalates from './oxalates/reducers'
import { Oxalates } from './oxalates/index';

// window.initialState is set in the layout
const store = createStore(
  oxalates,
  oxalates(window.initialState, {}),
  applyMiddleware(thunkMiddleware),
)

ReactDOM.render(
  <Provider store={store}>
    <Oxalates />
  </Provider>,
  document.getElementById('root'),
);
