import React from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

import Colors from '../constants/Colors';

export class FoodListActions extends React.Component {
  constructor() {
    super();
    this.state = { admin: false };
  }

  componentDidMount() {
    this.setState({ admin: this.props.admin });
  }

  logIn() {
    this.setState({ admin: true });
  }

  logOut() {
    this.setState({ admin: false });
  }

  render() {
    let sessionButton;
    if (this.state.admin) {
      sessionButton = <Button
        title="Log Out"
        onPress={() => this.logOut()}
      />;
    } else {
      sessionButton = <Button
        title="Log In"
        onPress={() => this.logIn()}
      />;
    }

    const searchContainerStyle = StyleSheet.flatten([styles.actionContainer, styles.searchContainer]);
    return (
      <View style={styles.container}>
        <View style={styles.actionContainer}>
          {sessionButton}
        </View>
        <View style={searchContainerStyle}>
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
  actionContainer: {
    flex: 1,
    margin: 4,
  },
  searchContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  search: {
    backgroundColor: Colors.backgroundColor,
    padding: 10,
    fontSize: 16,
  },
});
