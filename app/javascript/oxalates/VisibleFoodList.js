import { connect } from 'react-redux';
import { createFood, setNewFood } from './actions';
import { FoodList } from './FoodList';

const mapStateToProps = state => {
  const {
    requestedListId,
    newFood,
    newFoodListId,
    error,
    foods,
  } = state.foodList;
  const {
    lists,
  } = state.listMenu;
  const {
    password,
  } = state.session;
  const errorMessage = error ? error.message : null;
  return {
    requestedListId,
    newFood,
    newFoodListId,
    error: errorMessage,
    foods,
    lists,
    password,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createFood: (password, food, listId) => dispatch(createFood(password, food, listId)),
    setNewFood: (listId, food) => dispatch(setNewFood(listId, food)),
  };
};

export const VisibleFoodList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FoodList);
