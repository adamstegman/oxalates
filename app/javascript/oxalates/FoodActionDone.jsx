import React from 'react';
import PropTypes from 'prop-types';

import "./FoodActionDone.scss";

export const FoodActionDone = ({ onDoneEditingFoods }) => {
  return (
    <button type="button"
            className="food-action"
            onClick={onDoneEditingFoods}>
      Done
    </button>
  );
};

FoodActionDone.propTypes = {
  onDoneEditingFoods: PropTypes.func.isRequired,
};
