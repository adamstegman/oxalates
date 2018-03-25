import React from 'react';
import { Image, Platform } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import AllScreen from '../screens/AllScreen';
import VeryHighScreen from '../screens/VeryHighScreen';
import HighScreen from '../screens/HighScreen';
import ModerateScreen from '../screens/ModerateScreen';
import LowScreen from '../screens/LowScreen';

const icons = {
  All: require('../assets/images/icon-all.png'),
  VeryHigh: require('../assets/images/icon-very-high.png'),
  High: require('../assets/images/icon-high.png'),
  Moderate: require('../assets/images/icon-moderate.png'),
  Low: require('../assets/images/icon-low.png'),
};
const routes = {
  All: {
    screen: AllScreen,
  },
  VeryHigh: {
    screen: VeryHighScreen,
  },
  High: {
    screen: HighScreen,
  },
  Moderate: {
    screen: ModerateScreen,
  },
  Low: {
    screen: LowScreen,
  },
};

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
