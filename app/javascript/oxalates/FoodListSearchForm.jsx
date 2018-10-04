import { connect } from 'react-redux';
import { search } from './actions';
import { SearchForm } from './SearchForm';

const mapStateToProps = state => {
  const {
    query,
  } = state.foodList;
  return {
    query,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: query => dispatch(search(query)),
  };
};

export const FoodListSearchForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchForm);
