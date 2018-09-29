import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import { ActiveListMenu } from './active-list-menu';

export class Oxalates extends React.Component {
  render() {
    return (
      <div>
        <div className="body">
          <h1 className="title">Oxalates</h1>
          <div className="content">
          </div>
        </div>
        <ActiveListMenu />
      </div>
    );
  }
}
