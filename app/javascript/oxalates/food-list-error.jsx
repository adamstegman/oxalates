import React from 'react';

import './food-list-error.scss';

export const FoodListError = ({ error }) => (
  <li className="food-list-item error">{error}</li>
);
