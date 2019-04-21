import React from 'react';
import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import * as navRoutes from "../constants/NavRoutes";
import DeleteCafeModalScreen from '../screens/cafes/DeleteCafeModalScreen';


// export default createAppContainer(createSwitchNavigator({
//   Main: MainTabNavigator,
// }));

export default createAppContainer(
  createStackNavigator(
    {
      Main: MainTabNavigator,
      [navRoutes.DELETE_CAFE_MODAL]: DeleteCafeModalScreen
    },
    {
      mode: 'modal',
      headerMode: 'none',
    }
  )
);
