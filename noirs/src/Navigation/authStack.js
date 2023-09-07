import React from 'react';
import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import OnBoardingScreen from '../Screens/AuthScreens/onBoardingScreen';
import LoginScreen from '../Screens/AuthScreens/loginScreen';
import CreateAccountScreen from '../Screens/AuthScreens/createAccountScreen';
import OtpVerificationScreen from '../Screens/AuthScreens/otpVerificationScreen';
import VerifiedSuccessScreen from '../Screens/AuthScreens/verifiedSuccessScreen';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

const AuthStack = () => {

    const onBoardingState = useSelector((state)=>state.auth.onBoarding) 

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
             
             {onBoardingState?
             <Stack.Screen
                name="onBoarding"
                component={OnBoardingScreen}
                options={{
                    headerShown: false,
                    gestureEnabled: true,
                    animation: 'slide_from_right',
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
            />
            :false}

            <Stack.Screen
                name="login"
                component={LoginScreen}
                options={{
                    headerShown: false,
                    gestureEnabled: true,
                    animation: 'slide_from_right',
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
            /> 

            <Stack.Screen
                name="CreateAccount"
                component={CreateAccountScreen}
                options={{
                    headerShown: false,
                    gestureEnabled: true,
                    animation: 'slide_from_right',
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
            />

            <Stack.Screen
                name="OtpVerification"
                component={OtpVerificationScreen}
                options={{
                    headerShown: false,
                    gestureEnabled: true,
                    animation: 'slide_from_right',
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
            />

            <Stack.Screen
                name="VerifiedSuccess"
                component={VerifiedSuccessScreen}
                options={{
                    headerShown: false,
                    gestureEnabled: true,
                    animation: 'slide_from_right',
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
            />

        </Stack.Navigator>
    );
};

export default AuthStack;