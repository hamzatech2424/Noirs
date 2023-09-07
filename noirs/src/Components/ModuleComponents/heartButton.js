import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../theme'
import HeartFilledSvg from "../../Assets/Icons/heartFilledSvg"
import HeartNotFilledSvg from "../../Assets/Icons/heartNotFilledSvg"
import { useDispatch, useSelector } from 'react-redux'
import { addProductToWishList, removeProductFromWishList } from '../../Store/Slices/productsSlice'
import ProductsController from '../../Controller/productsController'
import { addProductIDToWishList, removeProductIDToWishList } from '../../Store/Slices/authSlice'
import AuthController from '../../Controller/authController'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HeartButton = ({ data }) => {

    const [active, setActive] = useState(false)
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.auth.user)


    const onPressHeart = (data) => {
        setActive((prev) => !prev)
        if (active) {
            console.log("bye")
            ProductsController.addProductToWishList(data._id)
                .then((result) => {
                    dispatch(removeProductFromWishList(data))
                    dispatch(removeProductIDToWishList(data._id))
                    setActive(false)
                    ProductsController.updatedUserForWishList()
                })
                .catch((error) => {
                    console.log(error, "Error in addProductToWishList")
                    setActive(false)
                })
        }
        else {
            console.log("hai")
            ProductsController.addProductToWishList(data._id)
                .then((result) => {
                    dispatch(addProductToWishList(data))
                    dispatch(addProductIDToWishList(data._id))
                    setActive(true)
                    ProductsController.updatedUserForWishList()
                })
                .catch((error) => {
                    console.log(error, "Error in addProductToWishList")
                    setActive(false)
                })
        }
    }

    useEffect(() => {
        if (userData) {
            let findIdInUserWishListIndex = userData?.wishList?.findIndex((item) => item == data?._id)
            if (findIdInUserWishListIndex >= 0) {
                setActive(true)
            }
            else {
                setActive(false)
            }
        }
  
    }, [userData])


    return (
        <TouchableOpacity
            onPress={() => onPressHeart(data)}
            activeOpacity={0.9}
            style={styles.mainContainer}>
            {active ?
                <HeartFilledSvg />
                :
                <HeartNotFilledSvg />
            }
        </TouchableOpacity>
    )
}

export default HeartButton

const styles = StyleSheet.create({
    mainContainer: {
        height: 28,
        width: 28,
        backgroundColor: "pink",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28,
        backgroundColor: Colors.primaryWhite
    }
})