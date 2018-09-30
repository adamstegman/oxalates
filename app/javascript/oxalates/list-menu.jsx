import React from 'react';
import PropTypes from 'prop-types';

import { ListMenuItem } from './list-menu-item';
import { listPropType } from './list-prop-type';

import './list-menu.scss';

export class ListMenu extends React.Component {
  isActive(list) {
    return !!this.props.activeListId && this.props.activeListId === list.id;
  }

  render() {
    const lists = this.props.lists;
    return (
      <ul className="list-menu">
        {lists.map(list =>
          <ListMenuItem key={list.id}
                        list={list}
                        active={this.isActive(list)}
                        onSelect={list => this.props.onListSelect(list)}/>
        )}
      </ul>
    );
  }
};

ListMenu.propTypes = {
  lists: PropTypes.arrayOf(listPropType).isRequired,
  activeListId: PropTypes.node,
};
