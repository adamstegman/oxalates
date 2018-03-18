import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

export default StackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);
