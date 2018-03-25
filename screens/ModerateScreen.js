import React from 'react';

import { FoodList } from '../components/FoodList';
import { ListService } from '../services/ListService';

export default class ModerateScreen extends React.Component {
  static navigationOptions = {
    title: 'Moderate Oxalates',
    tabBarLabel: 'Moderate',
  };

  constructor() {
    super();
    this.listService = new ListService();
  }

  render() {
    const list = this.listService.get('Moderate');
    return <FoodList list={list} />;
  }
}
