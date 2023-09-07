import React from 'react';
import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import BottomTabNavigation from './bottomTabNavigation';
import DrawerNavigation from './drawerNavigation';
import CategoriesDetailsScreen from '../Screens/AppScreens/categoriesDetailsScreen';
import ProductDetailScreen from '../Screens/AppScreens/productDetailScreen';
import CartScreen from '../Screens/AppScreens/cartScreen';
import CheckoutScreen from '../Screens/AppScreens/checkoutScreen';

const Stack = createStackNavigator();

const AppStack = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen
                name="BottomTab"
                component={BottomTabNavigation}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                    animation: 'slide_from_right',
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
            />

            <Stack.Screen
                name="CategoriesDetails"
                component={CategoriesDetailsScreen}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                    animation: 'slide_from_right',
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
            />

            <Stack.Screen
                name="Drawer"
                component={DrawerNavigation}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                    animation: 'slide_from_right',
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
            />

            <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                    animation: 'slide_from_right',
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
            />

            <Stack.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                    animation: 'slide_from_right',
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
            />

            <Stack.Screen
                name="CheckOut"
                component={CheckoutScreen}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                    animation: 'slide_from_right',
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
            />

            {/* <Stack.Screen
                name="WorkOutDetails"
                component={WorkoutDetailsScreen}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                    animation: 'slide_from_right',
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
            /> */}


        </Stack.Navigator>
    );
};

export default AppStack;