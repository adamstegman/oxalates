import React from 'react';

import { FoodList } from '../components/FoodList';
import { ListService } from '../services/ListService';

export default class LowScreen extends React.Component {
  static navigationOptions = {
    title: 'Low Oxalates',
    tabBarLabel: 'Low',
  };

  constructor() {
    super();
    this.listService = new ListService();
  }

  render() {
    const list = this.listService.get('Low');
    return <FoodList list={list} />;
  }
}
