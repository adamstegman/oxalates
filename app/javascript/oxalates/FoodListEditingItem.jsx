import React from 'react';
import PropTypes from 'prop-types';

import { cssify } from './cssify';
import { foodPropType } from './foodPropType';
import { listPropType } from './listPropType';

import FoodListItemDelete from './FoodListItemDelete.svg';
import './FoodListEditingItem.scss';

export class FoodListEditingItem extends React.Component {
  render() {
    const {
      food,
      list,
      password,
      deleteFood,
    } = this.props;

    const _deleteFood = () => {
      deleteFood(password, food);
    };
    const listClassName = cssify(list.name);
    return (
      <li className={`edit-food-list-item ${listClassName}`}>
        <button type="button" className="destroy-food-list-item" onClick={_deleteFood}>
          <FoodListItemDelete />
        </button>
        {food.name} - {food.oxalateMg.toFixed(2)}mg - {food.serving}
      </li>
    );
  }
};

FoodListEditingItem.propTypes = {
  food: foodPropType.isRequired,
  list: listPropType.isRequired,
  password: PropTypes.string,
  deleteFood: PropTypes.func.isRequired,
};
