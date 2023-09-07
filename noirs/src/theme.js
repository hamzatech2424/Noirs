import {Dimensions,Platform} from 'react-native'

export const Colors = {
  primaryBackground:"#FFFFFF",
  primaryBlue:'#2D2C42',
  primaryWhite:"#FFFFFF",
  primaryBlack:"#000000",
  primaryGray:"#F5F5F5",
  primaryGrayOne:'#5C5C5C',
  primaryGrayTwo:"#909090",
  primaryGrayThree:"#9A9A9A",
  primaryPink:"#FF6161"

}



export const Fonts = {
  default: 'OpenSans-Regular',
  medium: 'OpenSans-Medium',
  bold: 'OpenSans-Bold',
  semiBold:"OpenSans-SemiBold",
  thin: 'OpenSans-Light',
  extraBold:"OpenSans-ExtraBold"
};


export const Measures = {
  SW : Dimensions.get("window").width,
  SH : Dimensions.get("window").height,
  IOS: Platform.OS === 'ios',
  ANDROID: Platform.OS === 'android',
} 
