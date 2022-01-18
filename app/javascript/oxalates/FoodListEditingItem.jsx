import React from 'react';
import PropTypes from 'prop-types';

import { cssify } from './cssify';
import { foodPropType } from './foodPropType';
import { listPropType } from './listPropType';
import { FoodListItemDelete } from './FoodListItemDelete';

export class FoodListEditingItem extends React.Component {
  render() {
    const {
      food,
      list,
      password,
      deleteFood,
      setEditingFood,
    } = this.props;

    const _deleteFood = () => {
      deleteFood(password, food);
    };
    const _setEditingFood = () => {
      setEditingFood(food, list.id);
    }
    const listClassName = cssify(list.name);
    return (
      <li className="editing-food-list-item">
        <button type="button" className="destroy-food-list-item" onClick={_deleteFood}>
          <FoodListItemDelete />
        </button>
        <button type="button" className={`edit-food-list-item ${listClassName}`} onClick={_setEditingFood}>
          {food.name} - {food.oxalateMg.toFixed(2)}mg - {food.serving}
        </button>
      </li>
    );
  }
};

FoodListEditingItem.propTypes = {
  food: foodPropType.isRequired,
  list: listPropType.isRequired,
  password: PropTypes.string,
  deleteFood: PropTypes.func.isRequired,
  setEditingFood: PropTypes.func.isRequired,
};
