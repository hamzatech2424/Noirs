import { StyleSheet, Text, View, StatusBar, Image, NativeModules } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '../../theme'
import VerifiedSuccessSvg from '../../Assets/Icons/verifiedSuccessSvg';
import AbstractContentContainer from '../../Components/AbstractComponents/abstractContentContainer';
import AbstractButton from '../../Components/AbstractComponents/abstractButton';

const { StatusBarManager } = NativeModules;

const VerifiedSuccessScreen = () => {
    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={"transparent"} translucent={true} barStyle="light-content" />
            <View style={{ ...StyleSheet.absoluteFillObject }} >
                <Image source={require("../../Assets/Images/verifiedSuccess.png")} style={{ width: '100%', height: '100%' }} />
            </View>

            <View style={{ ...StyleSheet.absoluteFillObject }} >
                <View style={{ height: StatusBarManager.HEIGHT }} />
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <AbstractContentContainer>
                        <View style={{ marginTop: 30, width: '100%', alignItems: 'center' }}>
                            <Text style={styles.textOne}>OTP Verified Successfully</Text>
                        </View>
                    </AbstractContentContainer>
                </View>
                <View style={{ flex: 1,justifyContent:"flex-end",alignItems:'center' }}>
                    <View style={{marginBottom:20,width:'90%',alignSelf:'center'}}>
                        <View style={{marginBottom:10}}>
                            <Text style={styles.textTwo}>We are delighted to welcome you to our online shopping platform. Happy shopping!</Text>
                        </View>
                        <View style={{marginVertical:20}}>
                        <AbstractButton bgcolor={Colors.primaryWhite} txtColor={Colors.primaryBlack} label={"Let’s Start Shopping"} />
                        </View>
                    </View>
                </View>

            </View>
        </View>
    )
}

export default VerifiedSuccessScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    textOne: {
        fontSize: 29,
        fontFamily: Fonts.bold,
        color: Colors.primaryWhite,
    },
    textTwo: {
        fontSize: 15,
        fontFamily: Fonts.medium,
        color: Colors.primaryWhite,
        textAlign:"center"
    },
})