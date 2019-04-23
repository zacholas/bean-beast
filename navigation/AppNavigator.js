import React from 'react';
import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import * as navRoutes from "../constants/NavRoutes";
// import _unused_DeleteCafeModalScreen from '../screens/cafes/_unused_DeleteCafeModalScreen';


export default createAppContainer(createSwitchNavigator({
  Main: MainTabNavigator,
}));


//* @todo Unused from back when I had the modal as a react navigation style modal instead of as a component -- delete when ready.

// export default createAppContainer(
//   createStackNavigator(
//     {
//       Main: MainTabNavigator,
//       // [navRoutes.DELETE_CAFE_MODAL]: _unused_DeleteCafeModalScreen
//     },
//     {
//       mode: 'modal',
//       headerMode: 'none',
//     }
//   )
// );
