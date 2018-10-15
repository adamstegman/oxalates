import React from 'react';
import PropTypes from 'prop-types';

import { FoodActionsMenu } from './FoodActionsMenu';

export class AdminActionsMenu extends React.Component {
  render() {
    const {
      activeListId,
      authenticated,
      editingFoods,
      setEditingFoods,
      startNewFood,
    } = this.props;

    if (authenticated) {
      return <FoodActionsMenu activeListId={activeListId}
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
  editingFoods: PropTypes.bool,
  setEditingFoods: PropTypes.func.isRequired,
  startNewFood: PropTypes.func.isRequired,
};
