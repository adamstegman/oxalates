import React from 'react';

import { FoodListSearchForm } from './FoodListSearchForm';

import './ActionsMenu.scss';

export class ActionsMenu extends React.Component {
  render() {
    return (
      <div className="actions">
        <FoodListSearchForm />
      </div>
    );
  }
};

ActionsMenu.propTypes = {
};
