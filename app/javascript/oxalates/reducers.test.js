import oxalates from './reducers';

describe('oxalates state', () => {
  it('is correct initially', () => {
    const initialState = {
      listMenu: {
        lists: [],
        activeListId: 'all',
      },
      foodList: {
        foods: [],
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
});
