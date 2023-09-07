import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../proxy";
import { store } from "../Store";
import { setUserData } from "../Store/Slices/authSlice";

const NETWORK_ERROR = "Internet Error"

class AuthController {

    static USER_DATA = "UserData"
    static ONBOARDING_STATE = "onBoardingScreenFirstTime"
    static ACCOUNT_TYPE = {
        EMAIL: "email",
        GOOGLE: "google",
        FACEBOOK: "facebook",
    }


    static firstTimeOnboardingScreenShow = () => {
        return new Promise((resolve, reject) => {
            AsyncStorage.setItem(AuthController.ONBOARDING_STATE, "firstTimeDone")
                .then((user) => {
                    resolve(user);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                })
        })
    }


    static createAccount = (fullName, email, accountType, accountId) => {
        return new Promise((resolve, reject) => {

            const body = {
                fullName,
                email,
                accountType,
                accountId
            }
            axios
                .post(`${BASE_URL}/user/auth/signup`, body)
                .then(response => {
                    // console.log(response.data, 'createAccountResponse')
                    if (response.data.success) {
                        if (response.data.data.message) {
                            resolve(response.data.data.message);
                        }
                        else {
                            resolve(response.data.data);
                        }
                    } else {
                        reject(response.data.error.message);
                    }
                })
                .catch(err => {
                    console.log(err, "Error in createAccountApiCall");
                    reject(NETWORK_ERROR);
                });
        })
    }



    static loginAccount = (fullName, email, accountType, accountId) => {
        return new Promise((resolve, reject) => {

            let body = {}

            if (accountType == AuthController.ACCOUNT_TYPE.EMAIL) {
                body = {
                    email,
                    accountType,
                    accountId
                }
            }
            else {
                body = {
                    fullName,
                    email,
                    accountType,
                    accountId
                }
            }
            axios
                .post(`${BASE_URL}/user/auth/login`, body)
                .then(response => {
                    // console.log(response.data, 'loginAccountResponse')
                    if (response.data.success) {
                        if (response.data.data.message) {
                            resolve(response.data.data.message);
                        }
                        else {
                            resolve(response.data.data);
                        }
                    } else {
                        reject(response.data.error.message);
                    }
                })
                .catch(err => {
                    console.log(err, "Error in loginAccountApi");
                    reject(NETWORK_ERROR);
                });
        })
    }


    static verifyOtp = (email, otp) => {
        return new Promise((resolve, reject) => {

            const body = {
                email,
                otp
            }

            axios
                .post(`${BASE_URL}/user/auth/verify-otp`, body)
                .then(response => {
                    // console.log(response.data, 'loginAccountResponse')
                    if (response.data.success) {
                        resolve(response.data.data)
                    } else {
                        reject(response.data.error.message);
                    }
                })
                .catch(err => {
                    console.log(err, "Error in loginAccountApi");
                    reject(NETWORK_ERROR);
                });
        })
    }


    static saveUser = (userData, _callback = () => false) => {

        store.dispatch(setUserData(userData))
        AsyncStorage.setItem(AuthController.USER_DATA, JSON.stringify(userData))
            .then((user) => {
                console.log("User Saved in AsyncStorage")
                _callback(true);
            })
            .catch((error) => {
                console.log(error, 'Error in Saving user in AsyncStorage')
                _callback(false);
            })
    }

    static getCurrentUserData = () => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(AuthController.USER_DATA)
                .then((user) => {
                    if (user != null) {
                        resolve(JSON.parse(user))
                    }
                    else {
                        resolve({})
                    }
                })
                .catch((err) => {
                    console.log(err, "Error in getting UserData from AsyncStorage");
                    reject(err);
                })
        })
    }

    static currentUser = () => {
        return store.getState().auth.user;
    }

    static logOut = () => {
        return new Promise((resolve, reject) => {
            store.dispatch(setUserData({}))
            // AsyncStorage.clear()
            AsyncStorage.removeItem(AuthController.USER_DATA)
                .then((result) => {
                    resolve(true)
                })
                .catch((error) => {
                    console.log(error, 'Error in Clearing AuthController.USER_DATA')
                    reject(error)
                })
        })
    }

}

export default AuthController


