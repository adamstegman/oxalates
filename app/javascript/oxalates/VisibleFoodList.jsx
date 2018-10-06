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
  return {
    requestedListId,
    error,
    foods,
    lists,
  };
};

export const VisibleFoodList = connect(
  mapStateToProps,
)(FoodList);
