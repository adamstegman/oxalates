import React from 'react';
import { StyleSheet, Text } from 'react-native';

export class FoodListItem extends React.Component {
  render() {
    const food = this.props.food;
    let display = '';
    if (food) {
      const oxalates = food.oxalate_mg.toFixed(2);
      display = `${food.name} - ${oxalates}mg - ${food.serving}`;
    }
    return <Text style={styles.text}>{display}</Text>;
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 40,
  },
});
