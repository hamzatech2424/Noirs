import React from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context'
import {SafeAreaView, Platform, View} from 'react-native'

const defaultProps = {
  upperStyle: {backgroundColor: 'white'},
  bottomStyle: {backgroundColor: 'white'},
};

const ScreenContainer = ({upperStyle, bottomStyle, children}) => {
 const backgroundColor = upperStyle.backgroundColor? upperStyle.backgroundColor: "white"
//  if(Platform.OS === "android"){
//   return (
//     <View style={{flex:1}}>
//       {children}
//     </View>
//   )
//  } else{
  return (
    <>
      <SafeAreaView style={[{flex: 0}, upperStyle]} />
      <SafeAreaView style={{flex: 1, backgroundColor }}>
        {children}
      </SafeAreaView>
      <SafeAreaView style={[{flex: 0}, bottomStyle]} />
    </>
  );
//  }
 
};
ScreenContainer.defaultProps = defaultProps;
export default ScreenContainer;
