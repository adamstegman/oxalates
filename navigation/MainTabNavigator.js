import React from 'react';
import { Image, Platform } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import AllScreen from '../screens/AllScreen';
import SettingsScreen from '../screens/SettingsScreen';

const icons = {
  All: require('../assets/images/icon-all.png'),
};
const routes = {
  All: {
    screen: AllScreen,
  },
};
if (__DEV__) {
  routes.Settings = {
    screen: SettingsScreen,
  };
}

export default TabNavigator(
  routes,
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        if (icons[routeName]) {
          return <Image source={icons[routeName]} />;
        } else {
          return undefined;
        }
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
