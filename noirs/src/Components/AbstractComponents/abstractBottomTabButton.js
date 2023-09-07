import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Fonts, Colors } from '../../theme';

const AbstractBottomTabButton = ({
  svg,
  width,
  label,
  myStyle,
  onPress,
  isFocused
}) => {
  const defLabel = label ? label : 'text';
  const defWidth = width ? width : '20%';


  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.mainContainer, { width: defWidth }, { ...myStyle }]}
    >
      <View style={{ marginBottom: isFocused ? 0 : 8, backgroundColor: isFocused ? Colors.primaryGray : Colors.primaryWhite, borderRadius: 20, paddingVertical: 5, paddingHorizontal: 10 }}>
        {svg ? svg() : null}
      </View>
      {isFocused ?
        <View style={{ marginBottom: 15, marginTop: 3 }}>
          <Text style={styles.textOne}>{defLabel}</Text>
        </View>
        : false}
    </TouchableOpacity>
  );
};

export default AbstractBottomTabButton;

const styles = StyleSheet.create({
  mainContainer: {
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    // backgroundColor:'pink',
    // paddingBottom:20
  },
  textOne: {
    fontSize: 11,
    fontFamily: Fonts.semiBold
  }
});
