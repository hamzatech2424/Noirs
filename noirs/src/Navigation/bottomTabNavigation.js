import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/AppScreens/homeScreen';
import CustomBottomTabBar from './customBottomTabBar';
import CategoriesScreen from '../Screens/AppScreens/categoriesScreen';
import WishlistScreen from '../Screens/AppScreens/wishlistScreen';
import NotificationsScreen from '../Screens/AppScreens/notificationsScreen';
import SettingScreen from '../Screens/AppScreens/settingScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      tabBar={props => <CustomBottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Category" component={CategoriesScreen} />
      <Tab.Screen name="WishList" component={WishlistScreen} />
      <Tab.Screen name="Notification" component={NotificationsScreen} />
      <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;