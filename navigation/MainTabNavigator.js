import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import * as navRoutes from '../constants/NavRoutes';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EquipmentScreen from '../screens/EquipmentScreen';
import MenuMoreScreen from '../screens/MenuMoreScreen';


//* Cafes
import CafeListScreen from '../screens/cafes/CafeListScreen';
import EditCafeScreen from '../screens/cafes/EditCafeScreen';
import ViewCafeScreen from '../screens/cafes/ViewCafeScreen';

//* Beans
import BeansListScreen from '../screens/beans/BeansListScreen';
import EditBeanScreen from '../screens/beans/EditBeanScreen';
import ViewBeanScreen from '../screens/beans/ViewBeanScreen';
import RateBeanScreen from '../screens/beans/RateBeanScreen';

//* Recipes
import RecipeListScreen from '../screens/recipes/RecipeListScreen';
import EditRecipeScreen from '../screens/recipes/EditRecipeScreen';
import ViewRecipeScreen from '../screens/recipes/ViewRecipeScreen';

//* Beans Wizard
// import BeanPhotoStepScreen from '../components/beans/EditBeanFormSteps/BeanPhotoStepScreen';
// import BeanRoastLevelStepScreen from '../components/beans/EditBeanFormSteps/BeanRoastLevelStepScreen';

const HomeStack = createStackNavigator({
  [navRoutes.HOME]: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const EquipmentStack = createStackNavigator({
  [navRoutes.EQUIPMENT]: EquipmentScreen,
});

EquipmentStack.navigationOptions = {
  tabBarLabel: 'Equipment',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};


//* Cafes
const CafeStack = createStackNavigator({
  [navRoutes.CAFE_LIST]: CafeListScreen,
  [navRoutes.EDIT_CAFE]: EditCafeScreen,
  [navRoutes.VIEW_CAFE]: ViewCafeScreen,
});

CafeStack.navigationOptions = {
  tabBarLabel: 'Cafes / Roasters',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};


//* Recipes
const RecipeStack = createStackNavigator({
  [navRoutes.RECIPE_LIST]: RecipeListScreen,
  [navRoutes.EDIT_RECIPE]: EditRecipeScreen,
  [navRoutes.VIEW_RECIPE]: ViewRecipeScreen,
});

RecipeStack.navigationOptions = {
  tabBarLabel: 'Recipes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

// const EditBeanStack = createStackNavigator({
//   [navRoutes.EDIT_BEAN_ROAST_LEVEL_STEP]: BeanRoastLevelStepScreen,
//   [navRoutes.EDIT_BEAN_PHOTO_STEP]: BeanPhotoStepScreen,
// },
// {
//   // mode: 'modal',
//   headerMode: 'none',
// });


const BeansStack = createStackNavigator({
  [navRoutes.BEANS_LIST]: BeansListScreen,
  [navRoutes.EDIT_BEAN]: EditBeanScreen,
  [navRoutes.VIEW_BEAN]: ViewBeanScreen,
  [navRoutes.RATE_BEAN]: RateBeanScreen,
  [navRoutes.VIEW_RECIPE]: ViewRecipeScreen,
});

BeansStack.navigationOptions = {
  tabBarLabel: 'Beans',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const LinksStack = createStackNavigator({
  [navRoutes.LINKS]: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

// const SettingsStack = createStackNavigator({
//   [navRoutes.SETTINGS]: SettingsScreen,
// });
//
// SettingsStack.navigationOptions = {
//   tabBarLabel: 'Settings',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
//     />
//   ),
// };

const MoreStack = createStackNavigator(
  {
    [navRoutes.MENU_MORE]: MenuMoreScreen,
    [navRoutes.SETTINGS]: SettingsScreen,
  },
  {
    // mode: 'modal',
    // headerMode: 'none',
  }
);

MoreStack.navigationOptions = {
  tabBarLabel: 'More',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  CafeStack,
  BeansStack,
  RecipeStack,
  // EquipmentStack,
  // SettingsStack,
  MoreStack
});

