import { connect } from 'react-redux';
import {
  doneEditingFoods,
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
    doneEditingFoods: () => dispatch(doneEditingFoods()),
    setEditingFoods: editingFoods => dispatch(setEditingFoods(editingFoods)),
    startNewFood: listId => dispatch(setNewFood(listId)),
  };
};

export const AuthenticatedAdminActionsMenu = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminActionsMenu);
