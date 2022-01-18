import React from 'react';
import PropTypes from 'prop-types';

export const FoodActionEdit = ({ onEditFoods }) => {
  return (
    <button type="button"
            className="food-action"
            onClick={onEditFoods}>
      Edit
    </button>
  );
};

FoodActionEdit.propTypes = {
  onEditFoods: PropTypes.func.isRequired,
};
