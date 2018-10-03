import React from 'react';
import PropTypes from 'prop-types';

import { cssify } from './cssify';
import { foodPropType } from './foodPropType';
import { listPropType } from './listPropType';

import './FoodListItem.scss';

export class FoodListItem extends React.Component {
  render() {
    const {
      food,
      list,
    } = this.props;

    const listClassName = cssify(list.name);
    return (
      <li className={`food-list-item ${listClassName}`}>
        {food.name} - {food.oxalateMg.toFixed(2)}mg - {food.serving}
      </li>
    );
  }
};

FoodListItem.propTypes = {
  food: foodPropType.isRequired,
  list: listPropType.isRequired,
};
