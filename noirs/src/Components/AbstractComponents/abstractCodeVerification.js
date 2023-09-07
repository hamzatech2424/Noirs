import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { moderateScale } from 'react-native-size-matters';
import CursorSvg from '../../Assets/Icons/cursorSvg';
import { Colors, Fonts } from '../../theme';

const CELL_COUNT = 6;

const AbstractCodeVerification = ({onChangeText,error}) => {

  const [OTP, setOtp] = useState('');

  useEffect(()=>{
    onChangeText(OTP)
  },[OTP])


  return (
    <View>
      <CodeField
        value={OTP}
        cellCount={CELL_COUNT}
        caretHidden={false}
        onSubmitEditing={() => Keyboard.dismiss()}
        textContentType="oneTimeCode"
        onChangeText={setOtp}
        keyboardType="number-pad"
        keyboardAppearance={'dark'}
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            style={[styles.cellView,{borderColor:error?'red':Colors.primaryBlue }]}>
            <Text style={[styles.textTwo, { fontSize: 24,fontWeight:"500"}]}>
              {isFocused ? <Cursor cursorSymbol={<CursorSvg color={Colors.primaryBlue} />} /> : symbol}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default AbstractCodeVerification;

const styles = StyleSheet.create({
  textTwo: {
    fontFamily: Fonts.medium,
    color: Colors.primaryBlue,
    fontSize:13,
  },
  cellView: {
    backgroundColor:"transparent",
    height: 55,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth:1.2
  },
});
