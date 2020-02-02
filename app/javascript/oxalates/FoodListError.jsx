import React from 'react';

import './FoodListError.scss';

export const FoodListError = ({ error }) => (
  <li className="food-list-item error">{error}</li>
);
