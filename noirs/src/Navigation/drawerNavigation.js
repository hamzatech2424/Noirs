import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProductListingScreen from '../Screens/AppScreens/productListingScreen';
import CustomDrawer from "./customDrawer"

const Drawer = createDrawerNavigator();

const DrawerNavigation = ({route}) => {

  const {categoryData,flowType} = route.params

  return (
    <Drawer.Navigator initialRouteName="Home"
    drawerContent={props =><CustomDrawer {...props} /> }
    screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="ProductListing" component={ProductListingScreen} initialParams={{ categoryData,flowType }} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;