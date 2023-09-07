import { StyleSheet, Text, View, StatusBar, NativeModules, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts } from '../../theme'
import AbstractContentContainer from '../../Components/AbstractComponents/abstractContentContainer';
import AbstractButton from '../../Components/AbstractComponents/abstractButton';
import AbstractCodeVerification from '../../Components/AbstractComponents/abstractCodeVerification';
import AuthController from '../../Controller/authController';
import { clearAndNavigate, navigate } from '../../Navigation/mainNavigation';
import axios from 'axios';

const { StatusBarManager } = NativeModules;

const OtpVerificationScreen = ({ route }) => {

    const { email } = route.params
    const [otp, setOTP] = useState('');
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)


    const onPressVerify = () => {
        setErrorMessage("")
        if(otp.length == 6){
            setLoading(true)
            AuthController.verifyOtp(email,otp)
                .then((result) => {
                    if(result.code == 200){
                        axios.defaults.headers.common['Authorization'] = result.token
                        AuthController.saveUser(result.user,()=>{
                            setLoading(false)
                            clearAndNavigate("App")
                        })
                        // console.log(result, 'VerifyOtp response ===>')
                    }
                 
                })
                .catch((error) => {
                    setLoading(false)
                    setErrorMessage(error)
                    console.log(error, 'Error in verifyOtp')
                })
        }
        else{
            setErrorMessage("Otp must be filled properly")
        }
    }


    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={"transparent"} translucent={true} barStyle="light-content" />
            <View style={{ height: StatusBarManager.HEIGHT }} />
            <View style={{ width: '100%', height: 150 }}>
                <AbstractContentContainer>
                    <View style={{ justifyContent: 'center', height: "100%" }}>
                        <Text style={styles.textOne}>Account Verification</Text>
                        <Text style={styles.textTwo}>We have sent you an OTP code at <Text style={{ fontFamily: Fonts.bold }}>{email}</Text></Text>
                    </View>
                </AbstractContentContainer>
            </View>

            <View style={{ flex: 1, backgroundColor: Colors.primaryWhite, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <AbstractContentContainer>
                        <View style={{ marginTop: 40, marginBottom: 20 }}>
                            <Text style={styles.textFour}>Enter the OTP we sent to you</Text>
                        </View>
                        <AbstractCodeVerification error={errorMessage} onChangeText={setOTP} />

                        <View style={{ marginTop: 50 }}>
                            <AbstractButton
                                onPress={onPressVerify}
                                processing={loading}
                                label={"Verify OTP"}
                                txtColor={Colors.primaryWhite} 
                                loaderColor={Colors.primaryWhite}
                                />
                        </View>

                        <View style={{ width: '100%', height: 20, justifyContent: "flex-end", paddingLeft: 5 }}>
                            {errorMessage ?
                                <Text style={styles.errorText}>{`*${errorMessage}`}</Text>
                                : false}
                        </View>

                        <View style={{ width: '100%', alignItems: 'center', marginTop: 50 }}>
                            <Text style={styles.textThree}>Didn’t get the email?<Text style={{ color: Colors.primaryBlue, fontFamily: Fonts.bold }}> Send Again</Text></Text>
                        </View>

                    </AbstractContentContainer>
                </ScrollView>
            </View>
        </View>
    )
}

export default OtpVerificationScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.primaryBlue
    },
    textOne: {
        fontFamily: Fonts.bold,
        fontSize: 26,
        color: Colors.primaryWhite
    },
    textTwo: {
        fontFamily: Fonts.default,
        fontSize: 14,
        color: Colors.primaryWhite
    },
    textThree: {
        fontFamily: Fonts.default,
        fontSize: 14,
        color: Colors.primaryGrayOne
    },
    textFour: {
        fontFamily: Fonts.semiBold,
        fontSize: 15,
        color: Colors.primaryBlue
    },
    errorText: {
        fontFamily: Fonts.default,
        fontSize: 12,
        color: "red"
    }
})