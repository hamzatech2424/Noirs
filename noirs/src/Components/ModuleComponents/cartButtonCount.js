import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'
import AbstractIconButton from '../AbstractComponents/abstractIconButton'
import CartSvg from '../../Assets/Icons/cartSvg'
import { navigate } from '../../Navigation/mainNavigation'
import CartController, { useCart } from '../../Controller/cartController'

const CartButtonCount = () => {

    const cart = useCart()

    useEffect(() => {
        CartController.handleFetchCart(() => {
            console.log("Cart Fetched Again")
        })
      }, [])

    return (
        <View
            style={{ width: '100%', height: "100%", justifyContent: 'center', alignItems: "flex-end" }}
        >
            <AbstractIconButton icon={() => <CartSvg />} badge badgeCount={cart?.items?.length} onPress={() => navigate("Cart")} />
        </View>
    )
}

export default CartButtonCount

const styles = StyleSheet.create({})