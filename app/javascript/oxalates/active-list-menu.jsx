import { connect } from 'react-redux';
import { ListMenu } from './list-menu';

const mapStateToProps = state => {
  return {
    lists: state.lists,
    activeListId: state.activeListId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export const ActiveListMenu = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListMenu);
