import { View, Text, StyleSheet, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '../../theme'
import AppLogoSvg from '../../Assets/Icons/appLogoSvg'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthController from '../../Controller/authController'
import { setOnboardingState } from '../../Store/Slices/authSlice'
import { useDispatch } from 'react-redux'

const SplashScreen = () => {
     
    const dispatch = useDispatch()

    useEffect(()=>{

        AsyncStorage.getItem(AuthController.ONBOARDING_STATE)
        .then((value) => {
            if (value != null) {
                dispatch(setOnboardingState(false))
            }
            else {
                dispatch(setOnboardingState(true))
            }
        })
        .catch((err) => {
            console.log(err, 'Error in getting onBoardingState SplashScreen')
        })
     
    },[])


    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={"transparent"} translucent={true} barStyle="light-content" />
            <AppLogoSvg />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.primaryBlue,
        justifyContent: "center",
        alignItems: 'center'
    }
})