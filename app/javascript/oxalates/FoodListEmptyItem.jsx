import React from 'react';
import PropTypes from 'prop-types';

export class FoodListEmptyItem extends React.Component {
  render() {
    return (
      <li className="food-list-item">
        No foods found
      </li>
    );
  }
};

FoodListEmptyItem.propTypes = {
};
