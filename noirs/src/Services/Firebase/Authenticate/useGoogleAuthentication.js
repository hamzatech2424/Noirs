import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';

GoogleSignin.configure(
    {
        scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
        webClientId: Platform.OS == "android" ? '965828394069-g943stpgmtspeioqd8ik0kok3qe789qt.apps.googleusercontent.com' : '965828394069-i2f4b6otrc3bh6jp4lihfln82ftjhsgg.apps.googleusercontent.com',
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    }
);

const useGoogleAuthentication = () => {

    const [googleLoading, setGoogleLoading] = useState(false)

    const onGoogleButtonPress = () => {
        return new Promise((resolve, reject) => {
            setGoogleLoading(true)
            GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
                .then((result) => {
                    console.log(result)
                    GoogleSignin.signIn()
                        .then((user) => {
                            const { idToken } = user
                            const googleCredential = auth.GoogleAuthProvider.credential(idToken)
                            resolve(auth().signInWithCredential(googleCredential))
                        })
                        .catch((error) => {
                            console.log(error, 'Error in GoogleSignin')
                            reject(error)
                        })
                })
                .catch((error) => {
                    console.log(error, 'Error in PlayServices')
                    reject(error)
                })
        })
    }

    return {
        onGoogleButtonPress,
        googleLoading,
        setGoogleLoading
    }
}

export default useGoogleAuthentication
