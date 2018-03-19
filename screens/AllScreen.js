import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import Colors from '../constants/Colors';

export default class AllScreen extends React.Component {
  static navigationOptions = {
    title: 'All Foods',
  };

  render() {
    return (
      <View style={styles.container}>
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
