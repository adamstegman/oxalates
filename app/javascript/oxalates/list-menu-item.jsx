import React from 'react';
import PropTypes from 'prop-types';

import { listPropType } from './list-prop-type';

import './list-menu-item.scss';

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
        {/* <%= link_to list do %> */}
          <div className="list-menu-item-content">
            <div className="list-menu-item-icon">
              {/* <%= render "list_menu_item_icon", list: list %> */}
            </div>
            <p className="list-menu-item-text">{this.props.list.name}</p>
          </div>
        {/* <% end %> */}
      </li>
    );
  }
};

ListMenuItem.propTypes = {
  list: listPropType.isRequired,
  active: PropTypes.bool,
};
