import { StackNavigator } from 'react-navigation';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import MainTabNavigator from './MainTabNavigator';

export default StackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
    },
  },
  {
    navigationOptions: {
      title: 'Oxalates',
      headerStyle: {
        backgroundColor: Colors.headerBackgroundColor,
        height: Layout.header.height,
      },
      headerTitleStyle: {
        fontFamily: 'MarkerFelt-Thin',
        fontSize: Layout.header.fontSize,
      },
    },
  }
);
