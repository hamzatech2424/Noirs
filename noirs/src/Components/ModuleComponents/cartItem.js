import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Fonts } from '../../theme'
import IncAndDecButtons from '../ModuleComponents/incAndDecButtons'
import DeleteSvg from '../../Assets/Icons/deleteSvg'
import CartController from '../../Controller/cartController'
import { useDispatch } from 'react-redux'
import { removeCartItem } from '../../Store/Slices/cartSlice'


const CartItem = ({ item, cartData }) => {

    const [sizeState, setSizeState] = useState("")
    const [styleState, setStyleState] = useState("")
    const [colorState, setColorState] = useState("")
    const [dataOfProduct, setDataOfProduct] = useState({})
    const dispatch = useDispatch()


    useEffect(() => {

        if (item) {
            const findVariant = item?.product?.variants.find((it) => it?._id == item?.variantId)
            if (findVariant != undefined) {
                // console.log(findVariant,'findVariant1234555555')
                setDataOfProduct(findVariant)
                const splittingStringToArray = findVariant?.combination?.split('/')
                setSizeState(splittingStringToArray[0])
                setStyleState(splittingStringToArray[2])
                setColorState(splittingStringToArray[1])
            }
            else {
                console.log("This product has no variant")
            }
        }

    }, [item])


    const onPressDelete = (item) => {
        CartController.deleteCartItem(cartData._id, item._id)
            .then((result) => {
                dispatch(removeCartItem(item))
            })
            .catch((error) => {
                console.log(error, 'Error in deleteCartItem')
                Alert.alert(error)
            })
    }


    // console.log(dataOfProduct?.pictures[0]?.image?.url,'productIdproductIdproductIdproductId')


    return (
        <View style={styles.mainContainer}>
            <View style={styles.viewOne}>

                <View style={{ width: 100, height: 100, borderRadius: 4 }}>
                    {Object.keys(dataOfProduct).length > 0 ?
                        <Image source={{ uri: dataOfProduct?.pictures[0]?.image?.url }} style={{ width: "100%", height: "100%", borderRadius: 4 }} />
                        :
                        <View style={{ width: "100%", height: '100%', borderRadius: 4 }} />
                    }
                </View>
                <IncAndDecButtons
                    item={item}
                    cartData={cartData}
                    initialValue={item?.cartedQuantity}
                    maxValue={dataOfProduct?.quantity}
                    onProductQuantitySelect={() => { }} />

            </View>

            <View style={styles.viewTwo}>

                <View>
                    <Text style={styles.textTwo}>{item?.product?.title}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
                    <Text style={styles.textThree}>{`$ ${item?.product?.price}`}</Text>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.textFour}>$15.99</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>

                    <View style={styles.viewFour}>
                        <Text style={styles.textFive}>{`Size: ${sizeState}`}</Text>
                    </View>

                    <View style={styles.viewFour}>
                        <Text style={styles.textFive}>{`Style: ${styleState}`}</Text>
                    </View>

                    <View style={styles.viewFour}>
                        <Text style={styles.textFive}>{`Color: ${colorState}`}</Text>
                    </View>


                </View>

            </View>

            <View style={styles.viewThree}>
                <TouchableOpacity onPress={() => onPressDelete(item)}>
                    <DeleteSvg />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default CartItem

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        paddingBottom: 20,
        borderBottomColor: Colors.primaryGray,
        borderBottomWidth: 1,
        flexDirection: 'row',
        height: 165,
        marginTop: 10
    },
    viewOne: {
        width: "30%",
        height: '100%',
        // backgroundColor: "pink"
    },
    viewTwo: {
        width: "60%",
        height: '100%',
        paddingLeft: 10
        // backgroundColor: "orange"
    },
    viewThree: {
        width: "10%",
        height: '100%',
        // backgroundColor: "pink",
        alignItems: 'flex-end'
    },
    textOne: {
        fontFamily: Fonts.semiBold,
        fontSize: 16,
        color: Colors.primaryGrayOne
    },
    textTwo: {
        fontFamily: Fonts.bold,
        fontSize: 14,
        color: Colors.primaryBlack
    },
    textThree: {
        fontFamily: Fonts.bold,
        fontSize: 14,
        color: Colors.primaryPink
    },
    textFour: {
        fontFamily: Fonts.semiBold,
        fontSize: 14,
        color: Colors.primaryGrayOne,
        textDecorationLine: 'line-through'
    },
    viewFour: {
        paddingVertical: 5,
        paddingHorizontal: 8,
        backgroundColor: Colors.primaryGray,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10
    },
    textFive: {
        fontFamily: Fonts.semiBold,
        fontSize: 12,
        color: Colors.primaryBlack,
    },
})