import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors, Fonts } from '../../theme'


const ColorBox = ({ item, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={styles.boxContainer}>
            <View style={[styles.colorBox, { backgroundColor: item?.title, borderWidth: item?.active ? 1.5 : 0, borderColor: item?.active ? Colors.primaryBlack : "transparent" }]} />
            <View>
                <Text style={styles.textOne}>{item?.title}</Text>
            </View>
        </TouchableOpacity>
    )
}


const ColorSelect = ({ data, onChangeSelected }) => {

    const [colorData, setColorData] = useState([])

    useEffect(() => {
        if (data) {
            const newArr = [...data]
            const colorsArr = newArr.map((item) => ({ _id: Math.floor(Math.random() * 211321), title: item, active: false }))
            const indexFirstOfArray = {...colorsArr[0],active:true}
            colorsArr[0] = indexFirstOfArray
            onChangeSelected(colorsArr[0]?.title)
            setColorData(colorsArr)
        }

    }, [data])


    const onPressAnyColor = (it) => {
        const newArr = [...colorData]
        const newModifiedArr = newArr.map((item) => item._id == it._id ? { ...item, active: true } : { ...item, active: false })
        onChangeSelected(it?.title)
        setColorData(newModifiedArr)
    }

    return (
        <View style={styles.mainContainer}>

            {colorData.map((item, index) => {
                return (
                    <ColorBox item={item} key={item?._id} onPress={() => onPressAnyColor(item)} />
                )
            })}

        </View>
    )
}

export default ColorSelect

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        flexDirection: 'row',
    },
    boxContainer: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    colorBox: {
        width: 40,
        height: 40,
        borderRadius: 6
    },
    textOne: {
        fontFamily: Fonts.default,
        fontSize: 13,
        color: Colors.primaryGrayOne
    },
})