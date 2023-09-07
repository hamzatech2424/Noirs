import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';




const useFacebookAuthentication = () => {

    const [fbLoading, setFbLoading] = useState(false)

    const onFacebookButtonPress = () => {
        return new Promise((resolve, reject) => {
            setFbLoading(true)
            LoginManager.logInWithPermissions(['public_profile', 'email'])
                .then((result) => {
                    if (result.isCancelled) {
                        reject('User cancelled the login process')
                    }
                    else {
                        AccessToken.getCurrentAccessToken()
                            .then((data) => {
                                if (!data) {
                                    reject('Something went wrong obtaining access token')
                                }
                                else {
                                    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
                                    const result = auth().signInWithCredential(facebookCredential)
                                    resolve(result)
                                }
                            })
                    }

                })
                .catch((error) => {
                    console.log(error, 'logInWithPermissions')
                    reject(error)
                })
        })
    }

    return {
        onFacebookButtonPress,
        fbLoading,
        setFbLoading
    }
}

export default useFacebookAuthentication
