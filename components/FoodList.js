import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
} from 'react-native';

import Colors from '../constants/Colors';
import { FoodListActions } from './FoodListActions';
import { FoodListItem } from './FoodListItem';
import { FoodService } from '../services/FoodService';

export class FoodList extends React.Component {
  constructor() {
    super();
    this.state = { foods: [] };
    this.foodService = new FoodService();
  }

  componentDidMount() {
    let bottomThreshold = undefined;
    let topThreshold = undefined;
    if (this.props.list) {
      bottomThreshold = this.props.list.bottomThreshold;
      topThreshold = this.props.list.topThreshold;
    }
    this.foodService.query({ bottomThreshold, topThreshold }).then((foods) => {
      this.setState({ foods, displayedFoods: foods });
    });
  }

  filterFoods(query) {
    if (query && query.length > 0) {
      const lowerQuery = query.toLowerCase();
      const displayedFoods = this.state.foods.filter(food => food.name.toLowerCase().startsWith(lowerQuery));
      this.setState({ displayedFoods });
    } else {
      this.setState({ displayedFoods: this.state.foods });
    }
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
        <FlatList data={this.state.displayedFoods}
                  renderItem={({ item }) => <FoodListItem food={item} />}
                  keyExtractor={(food, index) => index}
                  ItemSeparatorComponent={this.separator}
                  ListHeaderComponent={<FoodListActions
                    onFilter={query => this.filterFoods(query)}
                  />}
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
