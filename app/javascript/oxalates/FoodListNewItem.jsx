import React from 'react';
import PropTypes from 'prop-types';
import { foodPropType } from './foodPropType';

export const FoodListNewItem = ({ newFood, newFoodListId, setNewFood, cancelNewFood, createFood, error, password }) => {
  const setNewFoodName = event => {
    const newFoodWithName = Object.assign({}, newFood, { name: event.target.value });
    setNewFood(newFoodListId, newFoodWithName);
  };
  const setNewFoodOxalateMg = event => {
    const newFoodWithOxalateMg = Object.assign({}, newFood, { oxalateMg: event.target.value });
    setNewFood(newFoodListId, newFoodWithOxalateMg);
  };
  const setNewFoodServing = event => {
    const newFoodWithServing = Object.assign({}, newFood, { serving: event.target.value });
    setNewFood(newFoodListId, newFoodWithServing);
  };
  const _createFood = event => {
    event.preventDefault();
    createFood(password, newFood, newFoodListId);
  };

  const {
    name,
    oxalateMg,
    serving,
  } = newFood;
  let errorMessages = null;
  if (error instanceof Array) {
    errorMessages = error.map((msg, i) => <p key={i} className="error">{msg}</p>);
  } else if (error) {
    errorMessages = <p className="error">{error}</p>;
  }
  return (
    <form className="add-food" onSubmit={_createFood}>
      <label htmlFor="name">New food name</label>
      <input type="text" name="name" autoFocus value={name || ''} onChange={setNewFoodName} />
      <label htmlFor="oxalateMg">Oxalates per serving (mg)</label>
      <input type="number" name="oxalateMg" step="any" value={oxalateMg || 0.0} onChange={setNewFoodOxalateMg} />
      <label htmlFor="serving">Serving</label>
      <input type="text" name="serving" value={serving || ''} onChange={setNewFoodServing} />
      {errorMessages}
      <input type="submit" value="Add" />
      <button type="button" onClick={cancelNewFood}>Cancel</button>
    </form>
  );
};

FoodListNewItem.propTypes = {
  newFood: PropTypes.shape({}).isRequired,
  newFoodListId: PropTypes.node.isRequired,
  cancelNewFood: PropTypes.func.isRequired,
  createFood: PropTypes.func.isRequired,
  setNewFood: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  password: PropTypes.string,
};
