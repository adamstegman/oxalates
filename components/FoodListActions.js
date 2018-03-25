import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import Colors from '../constants/Colors';

export class FoodListActions extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            autoCapitalize={"none"}
            clearButtonMode={"always"}
            placeholder={"Filter"}
            returnKeyType={"search"}
            style={styles.search}
            onChangeText={query => this.props.onFilter(query)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.listHeaderBackgroundColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 48,
  },
  searchContainer: {
    flex: 1,
    borderRadius: 8,
    margin: 8,
    overflow: 'hidden',
  },
  search: {
    backgroundColor: Colors.backgroundColor,
    padding: 8,
    fontSize: 16,
  },
});
