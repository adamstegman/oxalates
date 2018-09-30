import { connect } from 'react-redux';
import { ListHeader } from './list-header';

const mapStateToProps = state => {
  const {
    lists,
    activeListId,
  } = state.listMenu;
  const list = lists.find(list => list.id === activeListId);
  return {
    list,
  };
};

export const ActiveListHeader = connect(
  mapStateToProps,
)(ListHeader);
