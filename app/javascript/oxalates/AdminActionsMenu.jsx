import React from 'react';
import PropTypes from 'prop-types';

import { FoodActionsMenu } from './FoodActionsMenu';

export class AdminActionsMenu extends React.Component {
  render() {
    const {
      activeListId,
      authenticated,
      startNewFood,
    } = this.props;

    if (authenticated) {
      return <FoodActionsMenu activeListId={activeListId} startNewFood={startNewFood} />;
    }

    return null;
  }
};

AdminActionsMenu.propTypes = {
  activeListId: PropTypes.node,
  authenticated: PropTypes.bool,
  startNewFood: PropTypes.func.isRequired,
};
