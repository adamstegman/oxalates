import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { FoodListSearchForm } from './FoodListSearchForm';
import { SearchForm } from './SearchForm';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore([thunk]);
const query = 'test';
const state = {
  foodList: {
    query,
  },
};

describe('FoodListSearchForm', () => {
  beforeEach(() => {
    fetchMock.mock('*', { body: { foods: [] } });
  });
  afterEach(() => {
    fetchMock.restore();
  });

  it('FoodListSearchForm renders the active query', () => {
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <FoodListSearchForm />
      </Provider>,
    );
    const renderedSearchForm = wrapper.find(SearchForm);
    expect(renderedSearchForm.prop('query')).toEqual(query);
  });

  it('executes a search on submit', () => {
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <FoodListSearchForm />
      </Provider>,
    );
    const renderedSearchForm = wrapper.find(SearchForm);
    expect(renderedSearchForm.prop('onSubmit')).toBeDefined();

    const expectedActions = [
      { type: 'SET_SEARCH_QUERY', query: 'test' },
      { type: 'FETCH_FOOD_SEARCH_RESULTS_REQUEST', query: 'test' },
      { type: 'FETCH_FOOD_SEARCH_RESULTS_SUCCESS', query: 'test', foods: [] },
    ];
    return renderedSearchForm.prop('onSubmit')('test').then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
