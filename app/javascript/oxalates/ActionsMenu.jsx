import React from 'react';

import { AuthenticatedAdminActionsMenu } from './AuthenticatedAdminActionsMenu';
import { ActiveSessionMenu } from './ActiveSessionMenu';
import { FoodListSearchForm } from './FoodListSearchForm';

export class ActionsMenu extends React.Component {
  render() {
    return (
      <div className="actions">
        <AuthenticatedAdminActionsMenu />
        <ActiveSessionMenu />
        <FoodListSearchForm />
      </div>
    );
  }
};

ActionsMenu.propTypes = {
};
