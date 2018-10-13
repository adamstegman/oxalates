import React from 'react';
import PropTypes from 'prop-types';

import { FoodActionAdd } from './FoodActionAdd';

import "./FoodActionsMenu.scss";

export class FoodActionsMenu extends React.Component {
  render() {
    const {
      activeListId,
      startNewFood,
    } = this.props;

    const onStartAddingFood = () => startNewFood(activeListId);
    let addButton = <FoodActionAdd onStartAddingFood={onStartAddingFood} />;

    return (
      <div className="actions-container">
        {addButton}
      </div>
    );
  }
};

FoodActionsMenu.propTypes = {
  activeListId: PropTypes.node,
  startNewFood: PropTypes.func.isRequired,
};
