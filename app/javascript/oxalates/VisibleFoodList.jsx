import { connect } from 'react-redux';
import { FoodList } from './FoodList';

const mapStateToProps = state => {
  const {
    requestedListId,
    error,
    foods,
  } = state.foodList;
  const {
    lists,
  } = state.listMenu;
  const errorMessage = error ? error.message : null;
  return {
    requestedListId,
    error: errorMessage,
    foods,
    lists,
  };
};

export const VisibleFoodList = connect(
  mapStateToProps,
)(FoodList);
