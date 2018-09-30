import { connect } from 'react-redux';
import { ListMenu } from './list-menu';
import { selectActiveList } from './actions';

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
