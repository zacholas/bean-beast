import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import * as navRoutes from '../constants/NavRoutes';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EquipmentScreen from '../screens/EquipmentScreen';

//* Cafes
import CafeListScreen from '../screens/cafes/CafeListScreen';
import EditCafeScreen from '../screens/cafes/EditCafeScreen';
import ViewCafeScreen from '../screens/cafes/ViewCafeScreen';
import DeleteCafeModalScreen from '../screens/cafes/DeleteCafeModalScreen';

//* Beans
import BeansListScreen from '../screens/beans/BeansListScreen';
import EditBeanScreen from '../screens/beans/EditBeanScreen';
import ViewBeanScreen from '../screens/beans/ViewBeanScreen';

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

const CafeStack = createStackNavigator({
  [navRoutes.CAFE_LIST]: CafeListScreen,
  [navRoutes.EDIT_CAFE]: EditCafeScreen,
  [navRoutes.VIEW_CAFE]: ViewCafeScreen,
  // [navRoutes.DELETE_CAFE_MODAL]: DeleteCafeModalScreen
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


const BeansStack = createStackNavigator({
  [navRoutes.BEANS_LIST]: BeansListScreen,
  [navRoutes.EDIT_BEAN]: EditBeanScreen,
  [navRoutes.VIEW_BEAN]: ViewBeanScreen,
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

const SettingsStack = createStackNavigator({
  [navRoutes.SETTINGS]: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  CafeStack,
  BeansStack,
  EquipmentStack,
  SettingsStack,
});

