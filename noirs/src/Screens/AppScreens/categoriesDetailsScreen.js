import { StyleSheet, FlatList, View, NativeModules, ActivityIndicator, TouchableOpacity, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AbstractContentContainer from '../../Components/AbstractComponents/abstractContentContainer';
import { Colors, Fonts } from '../../theme';
import AbstractHeader from '../../Components/AbstractComponents/abstractHeader';
import { goBack } from '../../Navigation/mainNavigation';
import BackArrowSvg from "../../Assets/Icons/backArrowSvg"
import CartSvg from "../../Assets/Icons/cartSvg"
import AbstractIconButton from '../../Components/AbstractComponents/abstractIconButton';
import CategoryDetailItem from '../../Components/ModuleComponents/categoryDetailItem';

const { StatusBarManager } = NativeModules;

const CategoriesDetailsScreen = ({ route }) => {

  const { categoryData } = route.params


  return (
    <View style={styles.mainContainer}>
      <View style={{ height: StatusBarManager.HEIGHT }} />
      <AbstractContentContainer>
        <AbstractHeader
          leftChild={() => (
            <TouchableOpacity
              style={{ width: '100%', height: "100%", justifyContent: 'center', alignItems: "flex-start" }}
              activeOpacity={0.9}
              onPress={() => goBack()}
            >
              <BackArrowSvg />
            </TouchableOpacity>
          )}
          rightChild={() => (
            <TouchableOpacity
              style={{ width: '100%', height: "100%", justifyContent: 'center', alignItems: "flex-end" }}
              activeOpacity={0.9}
            >
              <AbstractIconButton icon={() => <CartSvg />} badge badgeCount={100} />
            </TouchableOpacity>
          )}
          middleChild={() => (
            <View
              style={{ width: '100%', height: "100%", justifyContent: 'center', alignItems: "center" }}
            >
              <Text style={styles.textOne}>{`${categoryData.title} Collection`}</Text>
            </View>
          )}

        />
        <View style={{height:15}} />
        {categoryData.category.map((item,index) => {
          return (<CategoryDetailItem data={item} key={index} />)
        })}


      </AbstractContentContainer>
    </View>
  )
}

export default CategoriesDetailsScreen


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