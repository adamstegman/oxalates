import React from 'react';
import PropTypes from 'prop-types';

import { listPropType } from './listPropType';
import { ListMenuItemIcon } from './ListMenuItemIcon';

import './ListMenuItem.scss';

const ACTIVE_CLASS_NAME = 'active';
const EMPTY_CLASS_NAME = '';

export class ListMenuItem extends React.Component {
  activeClassName(list) {
    if (this.props.active) {
      return ACTIVE_CLASS_NAME;
    }
    return EMPTY_CLASS_NAME;
  }

  render() {
    return (
      <li className={`list-menu-item ${this.activeClassName(this.props.list)}`}>
        <button type="button"
                className="list-menu-item-content no-outline"
                onClick={() => this.props.onSelect(this.props.list)}>
          <div className="list-menu-item-icon">
            <ListMenuItemIcon list={this.props.list} />
          </div>
          <p className="list-menu-item-text">{this.props.list.name}</p>
        </button>
      </li>
    );
  }
};

ListMenuItem.propTypes = {
  list: listPropType.isRequired,
  active: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
};
