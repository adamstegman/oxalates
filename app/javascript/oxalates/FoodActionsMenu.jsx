import React from 'react';
import PropTypes from 'prop-types';

import { FoodActionAdd } from './FoodActionAdd';
import { FoodActionDone } from './FoodActionDone';
import { FoodActionEdit } from './FoodActionEdit';

import "./FoodActionsMenu.scss";

export class FoodActionsMenu extends React.Component {
  render() {
    const {
      activeListId,
      doneEditingFoods,
      editingFoods,
      setEditingFoods,
      startNewFood,
    } = this.props;

    let addButton = null;
    if (!editingFoods) {
      const onStartAddingFood = () => startNewFood(activeListId);
      addButton = <FoodActionAdd onStartAddingFood={onStartAddingFood} />;
    }

    let editButton = null;
    if (!editingFoods) {
      const onEditFoods = () => setEditingFoods(true);
      editButton = <FoodActionEdit onEditFoods={onEditFoods} />;
    }

    let doneButton = null;
    if (editingFoods) {
      doneButton = <FoodActionDone onDoneEditingFoods={doneEditingFoods} />;
    }

    return (
      <div className="actions-container">
        {addButton}
        {editButton}
        {doneButton}
      </div>
    );
  }
};

FoodActionsMenu.propTypes = {
  activeListId: PropTypes.node,
  doneEditingFoods: PropTypes.func.isRequired,
  editingFoods: PropTypes.bool,
  setEditingFoods: PropTypes.func.isRequired,
  startNewFood: PropTypes.func.isRequired,
};
