import React from 'react';

import { ActiveSessionMenu } from './ActiveSessionMenu';
import { FoodListSearchForm } from './FoodListSearchForm';

import './ActionsMenu.scss';

export class ActionsMenu extends React.Component {
  render() {
    return (
      <div className="actions">
        <ActiveSessionMenu />
        <FoodListSearchForm />
      </div>
    );
  }
};

ActionsMenu.propTypes = {
};
