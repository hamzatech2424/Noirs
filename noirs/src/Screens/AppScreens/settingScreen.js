import { StyleSheet, Text, View, NativeModules, TouchableOpacity } from 'react-native'
import React from 'react'
import AbstractContentContainer from '../../Components/AbstractComponents/abstractContentContainer';
import { Colors, Fonts } from '../../theme';
import AbstractHeader from '../../Components/AbstractComponents/abstractHeader';
import AbstractButton from '../../Components/AbstractComponents/abstractButton';
import AuthController from '../../Controller/authController';
import { clearAndNavigate } from '../../Navigation/mainNavigation';

const { StatusBarManager } = NativeModules;

const SettingScreen = () => {


  const onPressLogout = () => {
    AuthController.logOut()
      .then(() => {
        clearAndNavigate("Auth")
      })
      .catch((error) => {
        console.log(error, 'Error in Logout')
      })
  }

  return (
    <View style={styles.mainContainer}>
      <View style={{ height: StatusBarManager.HEIGHT }} />
      <AbstractContentContainer>
        <AbstractHeader
          middleChild={() => (
            <View
              style={{ width: '100%', height: "100%", justifyContent: 'center', alignItems: "center" }}
            >
              <Text style={styles.textOne}>{`Settings`}</Text>
            </View>
          )}
        />

        <AbstractButton onPress={onPressLogout} txtColor={Colors.primaryWhite} label={"Log Out"} />

      </AbstractContentContainer>
    </View>
  )
}

export default SettingScreen


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.primaryBackground
  },
  textOne: {
    fontFamily: Fonts.bold,
    fontSize: 19,
    color: Colors.primaryBlue
  },
})