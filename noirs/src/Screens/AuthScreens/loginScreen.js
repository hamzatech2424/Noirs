import { StyleSheet, Text, View, StatusBar, NativeModules, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts } from '../../theme'
import AbstractContentContainer from '../../Components/AbstractComponents/abstractContentContainer';
import AbstractTextInput from "../../Components/AbstractComponents/abstractTextInput"
import EmailSvg from "../../Assets/Icons/emailSvg"
import GoogleSvg from "../../Assets/Icons/googleSvg"
import FacebookSvg from "../../Assets/Icons/facebookSvg"
import AbstractButton from '../../Components/AbstractComponents/abstractButton';
import useGoogleAuthentication from '../../Services/Firebase/Authenticate/useGoogleAuthentication';
import useFacebookAuthentication from '../../Services/Firebase/Authenticate/useFacebookAuthentication';
import { clearAndNavigate, navigate } from '../../Navigation/mainNavigation';
import AuthController from '../../Controller/authController';
import axios from 'axios';

const { StatusBarManager } = NativeModules;

const LoginScreen = () => {

    const { onGoogleButtonPress, googleLoading, setGoogleLoading } = useGoogleAuthentication()
    const { onFacebookButtonPress, fbLoading, setFbLoading } = useFacebookAuthentication()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [errorMessage, setErrorMessage] = useState("")


    const continueWithGoogle = () => {
        onGoogleButtonPress()
            .then((result) => {
                const { displayName, email, uid } = result.user
                // console.log(displayName,email,AuthController.ACCOUNT_TYPE.GOOGLE,uid)
                AuthController.loginAccount(displayName, email, AuthController.ACCOUNT_TYPE.GOOGLE, uid)
                    .then((result) => {
                        axios.defaults.headers.common['Authorization'] = result.token
                        AuthController.saveUser(result.user, () => {
                            setGoogleLoading(false)
                            clearAndNavigate("App")
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                        setGoogleLoading(false)
                    })
            })
            .catch((error) => {
                console.log(error.message, 'error.messageerror.message')
                setGoogleLoading(false)
                if (error.message == "RNGoogleSignInError") {
                    Alert.alert("User cancelled google login")
                }
                else {
                    Alert.alert("Something went wrong")
                }
            })
    }


    const continueWithFacebook = () => {
        onFacebookButtonPress()
            .then((result) => {
                const { displayName, email, uid } = result.user
                AuthController.loginAccount(displayName, email, AuthController.ACCOUNT_TYPE.FACEBOOK, uid)
                    .then((result) => {
                        // console.log(result, "createAccountWithFacebook===>")
                        axios.defaults.headers.common['Authorization'] = result.token
                        AuthController.saveUser(result.user, () => {
                            setFbLoading(false)
                            clearAndNavigate("App")
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                        setFbLoading(false)
                    })
            })
            .catch((err) => {
                setFbLoading(false)
                Alert.alert(err)
                console.log(err, 'Error in onFacebookButtonPress')
            })
    }


    const onLoginAccountEmail = (name, _email, accountType, accountId) => {
        setErrorMessage("")
        if (email != "" && errorMessage == "") {
            setLoading(true)
            AuthController.loginAccount(name, _email, accountType, accountId)
                .then((result) => {
                    navigate("OtpVerification", { email })
                    setLoading(false)
                })
                .catch((error) => {
                    console.log(error)
                    setErrorMessage(error)
                    setLoading(false)
                })
        }
        else {
            if (email == "") {
                setEmailError("Please enter email")
            }
        }
    }



    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={"transparent"} translucent={true} barStyle="light-content" />
            <View style={{ height: StatusBarManager.HEIGHT }} />
            <View style={{ width: '100%', height: 150 }}>
                <AbstractContentContainer>
                    <View style={{ justifyContent: 'center', height: "100%" }}>
                        <Text style={styles.textOne}>Login </Text>
                        <Text style={styles.textTwo}>Please login to continue shopping</Text>
                    </View>
                </AbstractContentContainer>
            </View>

            <View style={{ flex: 1, backgroundColor: Colors.primaryWhite, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <AbstractContentContainer>

                        <View style={{ marginTop: 20 }}>
                            <AbstractTextInput
                                label={"Email"}
                                placeholder={"enter your email"}
                                icon={() => <EmailSvg />}
                                value={email}
                                error={emailError}
                                onChangeText={(txt) => {
                                    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                                    setEmail(txt)
                                    if (reg.test(txt) === false) {
                                        setEmailError("please enter a valid email")
                                    }
                                    else {
                                        setEmailError("")
                                    }
                                }}
                                keyboardType={"email-address"}
                            />
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <AbstractButton
                                loaderColor={Colors.primaryWhite}
                                processing={loading}
                                label={"Login"}
                                txtColor={Colors.primaryWhite}
                                onPress={() => onLoginAccountEmail(name = "", email, AuthController.ACCOUNT_TYPE.EMAIL, email)}
                            />
                        </View>
                        <View style={{ width: '100%', height: 20, justifyContent: "flex-end", paddingLeft: 5 }}>
                            {errorMessage ?
                                <Text style={styles.errorText}>{`*${errorMessage}`}</Text>
                                : false}
                        </View>

                        <View style={{ marginTop: 40, marginBottom: 50 }}>
                            <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 20 }} >
                                <View style={{ width: "45%", height: 2, backgroundColor: Colors.primaryGray }} />

                                <Text style={{ fontFamily: Fonts.bold, color: Colors.primaryBlue, fontSize: 15 }}>or</Text>
                                <View style={{ width: "45%", height: 2, backgroundColor: Colors.primaryGray }} />
                            </View>
                        </View>

                        <View>
                            <AbstractButton
                                onPress={continueWithGoogle}
                                icon={() => <GoogleSvg />}
                                iconAndText
                                txtSize={15}
                                bgcolor={Colors.primaryWhite}
                                label={"Continue with Google"}
                                txtColor={Colors.primaryBlue}
                                processing={googleLoading}
                            />
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <AbstractButton
                                onPress={continueWithFacebook}
                                icon={() => <FacebookSvg />}
                                iconAndText
                                txtSize={15}
                                bgcolor={Colors.primaryWhite}
                                label={"Continue with Facebook"}
                                txtColor={Colors.primaryBlue}
                                processing={fbLoading}
                            />
                        </View>
                        <View style={{ width: '100%', alignItems: 'center', marginTop: 50 }}>
                            <Text style={styles.textThree}>Don’t have an account? <Text onPress={() => navigate("CreateAccount")} style={{ color: Colors.primaryBlue, fontFamily: Fonts.bold }}>Sign up</Text></Text>
                        </View>
                    </AbstractContentContainer>
                </ScrollView>
            </View>


        </View>
    )
}

export default LoginScreen

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
    errorText: {
        fontFamily: Fonts.default,
        fontSize: 12,
        color: "red"
    }
})