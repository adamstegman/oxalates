import { connect } from 'react-redux';
import {
  createFood,
  deleteFood,
  setEditingFood,
  setNewFood,
  updateFood,
} from './actions';
import { FoodList } from './FoodList';

const mapStateToProps = state => {
  const {
    editingFood,
    editingFoodListId,
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
    editingFood,
    editingFoodListId,
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
    setEditingFood: (food, listId) => dispatch(setEditingFood(food, listId)),
    setNewFood: (listId, food) => dispatch(setNewFood(listId, food)),
    updateFood: (password, food, listId) => dispatch(updateFood(password, food, listId)),
  };
};

export const VisibleFoodList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FoodList);
