import oxalates from './reducers';

test('initial state', () => {
  const initialState = {
    listMenu: {
      lists: [],
      activeListId: 'all',
    },
    foodList: {
      foods: [],
      editingFood: null,
      editingFoodListId: null,
      editingFoods: false,
      newFood: null,
      newFoodListId: null,
      requestedEditingFood: null,
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
