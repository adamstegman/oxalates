import React from 'react';
import PropTypes from 'prop-types';

import { listPropType } from './listPropType';

const VERY_HIGH_COLOR = 'black';
const HIGH_COLOR = '#e00';
const MODERATE_COLOR = '#fa0';
const LOW_COLOR = 'green';

export class ListMenuItemIcon extends React.Component {
  getLineColors() {
    switch (this.props.list.name) {
      case 'Very High':
        return Array(4).fill(VERY_HIGH_COLOR);
      case 'High':
        return Array(4).fill(HIGH_COLOR);
      case 'Moderate':
        return Array(4).fill(MODERATE_COLOR);
      case 'Low':
        return Array(4).fill(LOW_COLOR);
      default:
        return [VERY_HIGH_COLOR, HIGH_COLOR, MODERATE_COLOR, LOW_COLOR];
    }
  };

  render() {
    const lineColors = this.getLineColors();
    return (
      <svg width="21" height="25">
        <rect x="0" y="0" width="21" height="25" stroke="black" strokeWidth="3" fill="none"/>
        <line x1="3" y1="5" x2="18" y2="5" stroke={lineColors[0]} strokeWidth="2"/>
        <line x1="3" y1="10" x2="18" y2="10" stroke={lineColors[1]} strokeWidth="2"/>
        <line x1="3" y1="15" x2="18" y2="15" stroke={lineColors[2]} strokeWidth="2"/>
        <line x1="3" y1="20" x2="18" y2="20" stroke={lineColors[3]} strokeWidth="2"/>
      </svg>
    );
  }
};

ListMenuItemIcon.propTypes = {
  list: listPropType.isRequired,
};
