import { StyleSheet, Text, View, NativeModules, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { Colors, Fonts, Measures } from '../../theme'
import AbstractHeader from '../../Components/AbstractComponents/abstractHeader';
import { goBack } from '../../Navigation/mainNavigation';
import BackArrowSvg from '../../Assets/Icons/backArrowSvg';
import CartSvg from '../../Assets/Icons/cartSvg';
import AbstractIconButton from '../../Components/AbstractComponents/abstractIconButton';
import { useAllWishListProducts } from '../../Controller/productsController';
import CartButtonCount from '../../Components/ModuleComponents/cartButtonCount';
import WishlistItem from '../../Components/ModuleComponents/wishlistItem';

const { StatusBarManager } = NativeModules;

const WishlistScreen = () => {

  const allWishListProducts = useAllWishListProducts()


  return (
    <View style={styles.mainContainer}>
      <View style={{ height: StatusBarManager.HEIGHT }} />
      <View style={{ width: '90%', alignSelf: 'center' }}>
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
            <CartButtonCount />
          )}
          middleChild={() => (<View
            style={{ width: '100%', height: "100%", justifyContent: 'center', alignItems: "center" }}
          >
            <Text style={styles.textNine}>Liked Products</Text>
          </View>)}
        />


        <FlatList
          data={allWishListProducts}
          contentContainerStyle={{width:"100%",height:Measures.SH}}
          keyExtractor={item => item._id}
          renderItem={({item}) => {
            return <WishlistItem data={item} />
          }}
          ListEmptyComponent={() => {
            return (
              <View style={{ height: 200, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Text>No Product Found</Text>
              </View>
            )
          }}
        />




      </View>
    </View>
  )
}

export default WishlistScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.primaryBackground
  },
  textNine: {
    fontFamily: Fonts.bold,
    fontSize: 19,
    color: Colors.primaryBlue
  },
})