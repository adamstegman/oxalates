import { connect } from 'react-redux';
import { ListMenu } from './list-menu';
import { selectActiveListId } from './actions';

const mapStateToProps = state => {
  return {
    lists: state.lists,
    activeListId: state.activeListId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onListSelect: list => dispatch(selectActiveListId(list.id)),
  };
};

export const ActiveListMenu = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListMenu);
