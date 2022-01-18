import React from 'react';
import PropTypes from 'prop-types';
import { foodPropType } from './foodPropType';

export const FoodListUpdateItem = ({
  editingFood,
  editingFoodListId,
  cancelEditingFood,
  setEditingFood,
  updateFood,
  error,
  password,
}) => {
  const setFoodName = event => {
    const foodWithName = Object.assign({}, editingFood, { name: event.target.value });
    setEditingFood(foodWithName, editingFoodListId);
  };
  const setFoodOxalateMg = event => {
    const foodWithOxalateMg = Object.assign({}, editingFood, { oxalateMg: event.target.value });
    setEditingFood(foodWithOxalateMg, editingFoodListId);
  };
  const setFoodServing = event => {
    const foodWithServing = Object.assign({}, editingFood, { serving: event.target.value });
    setEditingFood(foodWithServing, editingFoodListId);
  };
  const _updateFood = event => {
    event.preventDefault();
    updateFood(password, editingFood, editingFoodListId);
  };

  const {
    name,
    oxalateMg,
    serving,
  } = editingFood;
  const errorMessages = (error || []).map((msg, i) => <p key={i} className="error">{msg}</p>);
  return (
    <form className="edit-food" onSubmit={_updateFood}>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" autoFocus value={name || ''} onChange={setFoodName} />
      <label htmlFor="oxalateMg">Oxalates per serving (mg)</label>
      <input type="number" name="oxalateMg" step="any" value={oxalateMg || 0.0} onChange={setFoodOxalateMg} />
      <label htmlFor="serving">Serving</label>
      <input type="text" name="serving" value={serving || ''} onChange={setFoodServing} />
      {errorMessages}
      <input type="submit" value="Update" />
      <button type="button" onClick={cancelEditingFood}>Cancel</button>
    </form>
  );
};

FoodListUpdateItem.propTypes = {
  editingFood: foodPropType.isRequired,
  editingFoodListId: PropTypes.node.isRequired,
  updateFood: PropTypes.func.isRequired,
  cancelEditingFood: PropTypes.func.isRequired,
  setEditingFood: PropTypes.func.isRequired,
  error: PropTypes.arrayOf(PropTypes.string),
  password: PropTypes.string,
};
