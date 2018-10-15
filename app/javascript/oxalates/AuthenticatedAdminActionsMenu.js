import { connect } from 'react-redux';
import {
  setEditingFoods,
  setNewFood,
} from './actions';
import { AdminActionsMenu } from './AdminActionsMenu';

const mapStateToProps = state => {
  const {
    authenticated,
  } = state.session;
  const {
    activeListId,
  } = state.listMenu;
  const {
    editingFoods,
  } = state.foodList;
  return {
    activeListId,
    authenticated,
    editingFoods,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setEditingFoods: editingFoods => dispatch(setEditingFoods(editingFoods)),
    startNewFood: listId => dispatch(setNewFood(listId)),
  };
};

export const AuthenticatedAdminActionsMenu = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminActionsMenu);
