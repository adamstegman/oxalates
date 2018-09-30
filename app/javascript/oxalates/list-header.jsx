import React from 'react';
import PropTypes from 'prop-types';

import { cssify } from './cssify';
import { listPropType } from './list-prop-type';

import './list-header.scss';

export class ListHeader extends React.Component {
  getListHeader(list) {
    if (list.name === "All") {
      return 'All Foods';
    }

    return `${list.name} Oxalates`;
  }

  render() {
    const {
      list,
    } = this.props;

    const listClassName = cssify(this.props.list.name);
    const header = this.getListHeader(this.props.list);

    return (
      <div>
        <h1 className={`title ${listClassName}`}>{header}</h1>
      </div>
    );
  }
};

ListHeader.propTypes = {
  list: listPropType.isRequired,
};
