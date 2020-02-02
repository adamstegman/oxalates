import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import { ActiveListHeader } from './ActiveListHeader';
import { ActiveListMenu } from './ActiveListMenu';
import { VisibleFoodList } from './VisibleFoodList';

export class Oxalates extends React.Component {
  render() {
    return (
      <div>
        <div className="body">
          <ActiveListHeader />
          <VisibleFoodList />
        </div>
        <ActiveListMenu />
      </div>
    );
  }
}
