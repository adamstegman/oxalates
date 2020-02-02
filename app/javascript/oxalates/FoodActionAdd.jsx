import React from 'react';
import PropTypes from 'prop-types';

import "./FoodActionAdd.scss";

export const FoodActionAdd = ({ onStartAddingFood }) => {
  return (
    <button type="button"
            className="food-action"
            onClick={onStartAddingFood}>
      Add
    </button>
  );
};

FoodActionAdd.propTypes = {
  onStartAddingFood: PropTypes.func.isRequired,
};
