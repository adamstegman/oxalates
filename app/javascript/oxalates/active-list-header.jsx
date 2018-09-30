import { connect } from 'react-redux';
import { ListHeader } from './list-header';

const mapStateToProps = state => {
  const list = state.lists.find(list => list.id === state.activeListId);
  return {
    list,
  };
};

export const ActiveListHeader = connect(
  mapStateToProps,
)(ListHeader);
