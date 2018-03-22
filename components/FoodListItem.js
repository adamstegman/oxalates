import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../constants/Colors';

export class FoodListItem extends React.Component {
  render() {
    const food = this.props.food;
    const oxalates = food.oxalate_mg.toFixed(2);
    const nameStyle = StyleSheet.flatten([styles.text]);
    const infoContainerStyle = StyleSheet.flatten([styles.container, styles.infoContainer]);
    const infoTextStyle = StyleSheet.flatten([nameStyle, styles.infoText]);
    return(
      <View style={styles.container}>
        <Text numberOfLines={1} style={nameStyle}>{food.name}</Text>
        <View style={infoContainerStyle}>
          <Text numberOfLines={1} style={infoTextStyle}>{oxalates}mg</Text>
          <Text numberOfLines={1} style={infoTextStyle}>{food.serving}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    marginLeft: 12,
    marginBottom: 4,
    marginRight: 12,
  },
  text: {
    flex: 7,
    fontSize: 16,
    lineHeight: 40,
  },
  infoContainer: {
    flex: 3,
    flexDirection: 'column',
  },
  infoText: {
    color: Colors.lightText,
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'right',
  },
});
