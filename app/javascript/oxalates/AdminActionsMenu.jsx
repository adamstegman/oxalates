import React from 'react';
import PropTypes from 'prop-types';

import { FoodActionsMenu } from './FoodActionsMenu';

export class AdminActionsMenu extends React.Component {
  render() {
    const {
      activeListId,
      authenticated,
      doneEditingFoods,
      editingFoods,
      setEditingFoods,
      startNewFood,
    } = this.props;

    if (authenticated) {
      return <FoodActionsMenu activeListId={activeListId}
                              doneEditingFoods={doneEditingFoods}
                              editingFoods={editingFoods}
                              setEditingFoods={setEditingFoods}
                              startNewFood={startNewFood} />;
    }

    return null;
  }
};

AdminActionsMenu.propTypes = {
  activeListId: PropTypes.node,
  authenticated: PropTypes.bool,
  doneEditingFoods: PropTypes.func.isRequired,
  editingFoods: PropTypes.bool,
  setEditingFoods: PropTypes.func.isRequired,
  startNewFood: PropTypes.func.isRequired,
};
