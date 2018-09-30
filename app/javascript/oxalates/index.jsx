import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import { ActiveListHeader } from './active-list-header';
import { ActiveListMenu } from './active-list-menu';

export class Oxalates extends React.Component {
  render() {
    return (
      <div>
        <div className="body">
          <ActiveListHeader />
        </div>
        <ActiveListMenu />
      </div>
    );
  }
}
