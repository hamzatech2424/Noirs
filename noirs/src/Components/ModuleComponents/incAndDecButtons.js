import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import MinusSvg from '../../Assets/Icons/minusSvg'
import PlusSvg from '../../Assets/Icons/plusSvg'
import { Colors } from '../../theme'
import CartController from '../../Controller/cartController'
import { useDispatch } from 'react-redux'
import { setCartItem } from '../../Store/Slices/cartSlice'

const IncAndDecButtons = ({ item, cartData, maxValue, onProductQuantitySelect, initialValue }) => {

    const [initialValueOfQuantity, setInitialValueOfQuantity] = useState(initialValue)
    const dispatch = useDispatch()

    const onPressPlus = () => {
        if (item) {
            if (maxValue != initialValueOfQuantity) {
                setInitialValueOfQuantity((prev) => prev + 1)
                onProductQuantitySelect(initialValueOfQuantity + 1)
                let productId = item?.product?._id
                let cartedQuantity = initialValueOfQuantity + 1
                let variantId = item?.variantId

                const preparedObject = {
                    cartedQuantity,
                    product: productId,
                    variantId
                }
                CartController.updateCartItem(preparedObject)
                    .then((result) => {
                        console.log(result, 'result=>+>+>+>+>+>+>+>+>')
                        const findProduct = result.items.find((it) => it.product._id == productId)
                        if (findProduct != undefined) {
                            //   console.log(findProduct,'findProductfindProduct')
                            dispatch(setCartItem(findProduct))
                        }
                        else {
                            console.log("product not found line 36")
                        }
                    })
                    .catch((error) => {
                        console.log(error, 'Error in updateCartItem')
                        Alert.alert("Something went wrong")
                    })

            }
            // const findVariant = item?.product?.variants.find((it) => it?._id == item?.variantId)
            // if (findVariant != undefined) {
            //     let cartProductId = item?._id
            //     let productId = item?.product?._id
            //     let cartedQuantity = initialValueOfQuantity + 1
            //     let combination = findVariant?.combination

            //     const preparedObject = {
            //         cartProductId,
            //         cartedQuantity,
            //         combination,
            //         productId
            //     }
            //     CartController.updateCartItem(preparedObject)
            //         .then((result) => {
            //           console.log(result,'result=>+>+>+>+>+>+>+>+>')
            //         })
            //         .catch((error) => {
            //          console.log(error,'Error in updateCartItem')
            //         })

            // }
            // else {
            //     console.log("No Matched variant found")
            // }
        }
        else {
            if (maxValue != initialValueOfQuantity) {
                setInitialValueOfQuantity((prev) => prev + 1)
                onProductQuantitySelect(initialValueOfQuantity + 1)
            }
        }


    }

    const onPressMinus = () => {


        if (item) {
            if (initialValueOfQuantity > 0) {
                setInitialValueOfQuantity((prev) => prev - 1)
                onProductQuantitySelect(initialValueOfQuantity - 1)
                let productId = item?.product?._id
                let cartedQuantity = initialValueOfQuantity - 1
                let variantId = item?.variantId

                const preparedObject = {
                    cartedQuantity,
                    product: productId,
                    variantId
                }
                CartController.updateCartItem(preparedObject)
                    .then((result) => {
                        console.log(result, 'result=>+>+>+>+>+>+>+>+>')
                        const findProduct = result.items.find((it) => it.product._id == productId)
                        if (findProduct != undefined) {
                            //   console.log(findProduct,'findProductfindProduct')
                            dispatch(setCartItem(findProduct))
                        }
                        else {
                            console.log("product not found line 36")
                        }
                    })
                    .catch((error) => {
                        console.log(error, 'Error in updateCartItem')
                        Alert.alert("Something went wrong")
                    })
            }
            // const findVariant = item?.product?.variants.find((it) => it?._id == item?.variantId)
            // if (findVariant != undefined) {
            //     let cartProductId = item?._id
            //     let productId = item?.product?._id
            //     let cartedQuantity = initialValueOfQuantity + 1
            //     let combination = findVariant?.combination

            //     const preparedObject = {
            //         cartProductId,
            //         cartedQuantity,
            //         combination,
            //         productId
            //     }
            //     CartController.updateCartItem(preparedObject)
            //         .then((result) => {
            //           console.log(result,'result=>+>+>+>+>+>+>+>+>')
            //         })
            //         .catch((error) => {
            //          console.log(error,'Error in updateCartItem')
            //         })

            // }
            // else {
            //     console.log("No Matched variant found")
            // }
        }
        else {
            if (initialValueOfQuantity > 0) {
                setInitialValueOfQuantity((prev) => prev - 1)
                onProductQuantitySelect(initialValueOfQuantity - 1)
            }
        }
    }


    useEffect(() => {
        setInitialValueOfQuantity(initialValue)
        onProductQuantitySelect(0)
    }, [maxValue])




    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={onPressMinus}
                style={[styles.buttonView, { marginLeft: 3 }]}>
                <MinusSvg />
            </TouchableOpacity>

            <View style={{ width: 30, height: 36, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.textOne}>{initialValueOfQuantity}</Text>
            </View>

            <TouchableOpacity
                activeOpacity={0.9}
                onPress={onPressPlus}
                style={[styles.buttonView, { marginRight: 3 }]}>
                <PlusSvg />
            </TouchableOpacity>
        </View>
    )
}

export default IncAndDecButtons

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        width: 100,
        backgroundColor: Colors.primaryGray,
        height: 36,
        borderRadius: 8,
        marginTop: 10,
        justifyContent: "space-between",
        alignItems: "center"
    },
    buttonView: {
        width: 30,
        height: 30,
        backgroundColor: Colors.primaryWhite,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: "center"
    },
})