import { StyleSheet, Text, View, StatusBar, NativeModules, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts } from '../../theme'
import AbstractContentContainer from '../../Components/AbstractComponents/abstractContentContainer';
import AbstractTextInput from "../../Components/AbstractComponents/abstractTextInput"
import EmailSvg from "../../Assets/Icons/emailSvg"
import NameSvg from "../../Assets/Icons/nameSvg"
import GoogleSvg from "../../Assets/Icons/googleSvg"
import FacebookSvg from "../../Assets/Icons/facebookSvg"
import AbstractButton from '../../Components/AbstractComponents/abstractButton';
import useGoogleAuthentication from '../../Services/Firebase/Authenticate/useGoogleAuthentication'
import useFacebookAuthentication from '../../Services/Firebase/Authenticate/useFacebookAuthentication';
import { clearAndNavigate, navigate } from '../../Navigation/mainNavigation';
import AuthController from "../../Controller/authController"
import axios from 'axios';

const { StatusBarManager } = NativeModules;

const CreateAccountScreen = () => {

    const { onGoogleButtonPress, googleLoading, setGoogleLoading } = useGoogleAuthentication()
    const { onFacebookButtonPress, fbLoading, setFbLoading } = useFacebookAuthentication()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [fullName, setFullName] = useState("")
    const [fullNameError, setFullNameError] = useState("")
    const [errorMessage, setErrorMessage] = useState("")


    const continueWithGoogle = () => {
        onGoogleButtonPress()
            .then((result) => {
                const { displayName, email, uid } = result.user
                // console.log(displayName,email,AuthController.ACCOUNT_TYPE.GOOGLE,uid)
                AuthController.createAccount(displayName, email, AuthController.ACCOUNT_TYPE.GOOGLE, uid)
                    .then((result) => {
                        // console.log(result, "createAccountWithGoogle===>")
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
                setGoogleLoading(false)
                console.log(error.message, 'error.messageerror.message')
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
                AuthController.createAccount(displayName, email, AuthController.ACCOUNT_TYPE.FACEBOOK, uid)
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

    const onCreateAccountEmail = (fullName, _email, accountType, accountId) => {
        setErrorMessage("")
        if (fullName != "" && email != "" && emailError == "" && fullNameError == "") {
            setLoading(true)
            AuthController.createAccount(fullName, _email, accountType, accountId)
                .then((result) => {
                    if (result == "Otp send!") {
                        navigate("OtpVerification", { email: _email })
                        setLoading(false)
                    }

                })
                .catch((error) => {
                    console.log(error)
                    setErrorMessage(error)
                    setLoading(false)
                })
        }
        else {
            if (fullName == "") {
                setFullNameError("Please enter full name")
            }
            else if (email == "") {
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
                        <Text style={styles.textOne}>Create Account</Text>
                        <Text style={styles.textTwo}>Please fill input below to get started</Text>
                    </View>
                </AbstractContentContainer>
            </View>

            <View style={{ flex: 1, backgroundColor: Colors.primaryWhite, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <AbstractContentContainer>

                        <View style={{ marginTop: 20 }}>
                            <AbstractTextInput
                                label={"Full Name"}
                                placeholder={"enter your full name"}
                                icon={() => <NameSvg />}
                                value={fullName}
                                onChangeText={(txt) => {
                                    setFullName(txt)
                                    if (txt.length < 6) {
                                        setFullNameError("fullname must be 6 letters long")
                                    }
                                    else {
                                        setFullNameError("")
                                    }
                                }}
                                error={fullNameError}
                            />
                        </View>

                        <View style={{ marginTop: 5, marginBottom: 10 }}>
                            <AbstractTextInput
                                label={"Email"}
                                placeholder={"enter your email"}
                                icon={() => <EmailSvg />}
                                value={email}
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
                                error={emailError}
                                keyboardType={"email-address"}
                            />
                        </View>

                        <View>
                            <AbstractButton
                                label={"Create Account"}
                                txtColor={Colors.primaryWhite}
                                processing={loading}
                                onPress={() => onCreateAccountEmail(fullName, email, AuthController.ACCOUNT_TYPE.EMAIL, email)}
                                loaderColor={Colors.primaryWhite}
                            />
                        </View>

                        <View style={{ width: '100%', height: 20, justifyContent: "flex-end", paddingLeft: 5 }}>
                            {errorMessage ?
                                <Text style={styles.errorText}>{`*${errorMessage}`}</Text>
                                : false}
                        </View>


                        <View style={{ marginTop: 30, marginBottom: 40 }}>
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
                            <Text style={styles.textThree}>Already have an account?<Text onPress={() => navigate("login")} style={{ color: Colors.primaryBlue, fontFamily: Fonts.bold }}> Login</Text></Text>
                        </View>
                        <View style={{ height: 30 }} />
                    </AbstractContentContainer>
                </ScrollView>
            </View>
        </View>
    )
}

export default CreateAccountScreen

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