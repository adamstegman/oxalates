import React from 'react';

import { FoodList } from '../components/FoodList';
import { ListService } from '../services/ListService';

export default class HighScreen extends React.Component {
  static navigationOptions = {
    title: 'High Oxalates',
    tabBarLabel: 'High',
  };

  constructor() {
    super();
    this.listService = new ListService();
  }

  render() {
    const list = this.listService.get('High');
    return <FoodList list={list} />;
  }
}
