import React, { createRef, useState, useEffect } from 'react';
import { NavigationContainer, DrawerActions, DarkTheme } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import AuthStack from './authStack';
import AppStack from './appStack';
import SplashScreen from '../Screens/AuthScreens/splashScreen';
import AuthController from '../Controller/authController';
import { useDispatch } from 'react-redux';
import { setUserData } from '../Store/Slices/authSlice';

const Stack = createStackNavigator();

export const navigationRef = createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function nestedNavigation(stackName, screenName, params) {
  navigationRef.current?.navigate(stackName, {
    screen: screenName,
    params: params,
  });
}

export function clearAndNavigate(name, params) {
  navigationRef.current?.reset({
    index: 0,
    routes: [{ name }],
    params: params,
  });
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function openDrawer() {
  navigationRef.current?.dispatch(DrawerActions.openDrawer())
}

export function closeDrawer() {
  navigationRef.current?.dispatch(DrawerActions.closeDrawer())
}

// const MyDarkTheme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     ...darkColors
//   },
// };


// const MyDefaultTheme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     ...lightColors
//   },
// };




const MainNavigation = () => {

  // const scheme = useColorScheme();
  // const [darkModeState, setDarkModeState] = useState(false)
  // const appTheme = darkModeState ? MyDarkTheme : MyDefaultTheme
  // const dispatch = useDispatch()
  // const appTheme = darkMode || scheme == "dark"  ? MyDarkTheme : MyDefaultTheme
  const [splashHide, setSplashHide] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    AuthController.getCurrentUserData()
      .then((result) => {
        if (Object.keys(result).length > 0) {
          console.log("UserData ==>",result)
          dispatch(setUserData(result))
          navigate("App")
          setSplashHide(true)
        }
        else {
          navigate("Auth")
          setSplashHide(true)
        }
      })
      .catch((error) => {
        setSplashHide(true)
        console.log(error, 'Error in Fetching data from AsyncStorage SplashScreen')
      })

  }, [])

  return (
    <NavigationContainer
      ref={navigationRef}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {splashHide ? false :
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{
              headerShown: false,
              gestureEnabled: true,
              animation: 'slide_from_right',
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
        }

        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{
            headerShown: false,
            gestureEnabled: true,
            animation: 'slide_from_right',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />

        <Stack.Screen
          name="App"
          component={AppStack}
          options={{
            headerShown: false,
            gestureEnabled: true,
            animation: 'slide_from_right',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;