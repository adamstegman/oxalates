import React from 'react';

import { FoodList } from '../components/FoodList';
import { ListService } from '../services/ListService';

export default class VeryHighScreen extends React.Component {
  static navigationOptions = {
    title: 'Very High Oxalates',
    tabBarLabel: 'Very High',
  };

  constructor() {
    super();
    this.listService = new ListService();
  }

  render() {
    const list = this.listService.get('Very High');
    return <FoodList list={list} />;
  }
}
