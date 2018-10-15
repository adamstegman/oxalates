import oxalates from './reducers';

test('initial state', () => {
  const initialState = {
    listMenu: {
      lists: [],
      activeListId: 'all',
    },
    foodList: {
      foods: [],
      editingFoods: false,
      newFood: null,
      newFoodListId: null,
      requestedNewFood: null,
      error: null,
      requestedListId: null,
      query: '',
    },
    session: {
      authenticated: false,
      authenticating: false,
      error: null,
      password: '',
    },
  };
  expect(oxalates(undefined, {})).toEqual(initialState);
});
