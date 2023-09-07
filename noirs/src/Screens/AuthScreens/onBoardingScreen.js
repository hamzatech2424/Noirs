import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OnboardingViewPager from '../../Components/ModuleComponents/onboardingViewPager'

const OnBoardingScreen = () => {
    return (
        <View style={styles.mainContainer}>
         <OnboardingViewPager />
        </View>
    )
}

export default OnBoardingScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    }
})