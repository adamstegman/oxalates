import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
} from 'react-native';

import Colors from '../constants/Colors';
import { FoodListItem } from '../components/FoodListItem';
import { FoodService } from '../services/FoodService';

export default class AllScreen extends React.Component {
  static navigationOptions = {
    title: 'All Foods',
  };

  constructor() {
    super();
    this.state = { foods: [] };
    this.foodService = new FoodService();
  }

  componentDidMount() {
    this.foodService.query().then((foods) => {
      this.setState({ foods });
    });
  }

  separator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: Colors.listSeparator,
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList data={this.state.foods}
                  renderItem={({ item }) => <FoodListItem food={item} />}
                  keyExtractor={(food, index) => index}
                  ItemSeparatorComponent={this.separator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});
