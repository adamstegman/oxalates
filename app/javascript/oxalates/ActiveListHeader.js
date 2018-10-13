import { connect } from 'react-redux';
import { ListHeader } from './ListHeader';

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
