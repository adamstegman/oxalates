import { connect } from 'react-redux';
import { setNewFood } from './actions';
import { AdminActionsMenu } from './AdminActionsMenu';

const mapStateToProps = state => {
  const {
    authenticated,
  } = state.session;
  const {
    activeListId,
  } = state.listMenu;
  return {
    activeListId,
    authenticated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startNewFood: listId => dispatch(setNewFood(listId)),
  };
};

export const AuthenticatedAdminActionsMenu = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminActionsMenu);
