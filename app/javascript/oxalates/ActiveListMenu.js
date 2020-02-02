import { connect } from 'react-redux';
import { selectActiveList } from './actions';
import { ListMenu } from './ListMenu';

const mapStateToProps = state => {
  const {
    lists,
    activeListId
  } = state.listMenu;
  return {
    lists,
    activeListId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onListSelect: list => dispatch(selectActiveList(list.id)),
  };
};

export const ActiveListMenu = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListMenu);
