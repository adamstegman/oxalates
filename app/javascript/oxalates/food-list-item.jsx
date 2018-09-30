import React from 'react';
import PropTypes from 'prop-types';

import { cssify } from './cssify';
import { foodPropType } from './food-prop-type';
import { listPropType } from './list-prop-type';

import './food-list-item.scss';

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
