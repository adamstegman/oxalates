import React from 'react';

import { FoodList } from '../components/FoodList';

export default class AllScreen extends React.Component {
  static navigationOptions = {
    title: 'All Foods',
    tabBarLabel: 'All',
  };

  render() {
    return <FoodList />;
  }
}
