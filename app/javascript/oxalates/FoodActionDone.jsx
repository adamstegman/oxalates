import React from 'react';
import PropTypes from 'prop-types';

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
