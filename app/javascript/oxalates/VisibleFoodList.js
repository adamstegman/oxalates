import { connect } from 'react-redux';
import { createFood, deleteFood, setNewFood } from './actions';
import { FoodList } from './FoodList';

const mapStateToProps = state => {
  const {
    editingFoods,
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
  return {
    editingFoods,
    requestedListId,
    newFood,
    newFoodListId,
    error,
    foods,
    lists,
    password,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createFood: (password, food, listId) => dispatch(createFood(password, food, listId)),
    deleteFood: (password, food) => dispatch(deleteFood(password, food)),
    setNewFood: (listId, food) => dispatch(setNewFood(listId, food)),
  };
};

export const VisibleFoodList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FoodList);
