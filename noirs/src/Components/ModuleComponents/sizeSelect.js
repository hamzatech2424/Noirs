import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors, Fonts } from '../../theme'


const SizeSelect = ({ data, onChangeSelected }) => {

    const [sizeData, setSizeData] = useState([])

    useEffect(() => {
        if (data) {
            const newArr = [...data]
            const sizeArr = newArr.map((item) => ({ _id: Math.floor(Math.random() * 211321), title: item, active: false }))
            const indexFirstOfArray = {...sizeArr[0],active:true}
            sizeArr[0] = indexFirstOfArray
            onChangeSelected(sizeArr[0]?.title)
            setSizeData(sizeArr)
        }
    }, [data])


    const onPressAnySelect = (it) => {
        const newArr = [...sizeData]
        const newModifiedArr = newArr.map((item) => item._id == it._id ? { ...item, active: true } : { ...item, active: false })
        onChangeSelected(it?.title)
        setSizeData(newModifiedArr)
    }

    return (
        <View style={styles.mainContainer}>

            {sizeData.map((item, index) => {
                return (
                    <TouchableOpacity
                        style={[styles.boxView, {borderRadius: 6, backgroundColor: '#F5F5F5', borderColor: item?.active ? Colors.primaryBlack : "transparent", borderWidth: item?.active ? 1 : 0 }]}
                        key={item?._id}
                        onPress={() => onPressAnySelect(item)}
                    >
                        <Text style={styles.textOne}>{item?.title}</Text>
                    </TouchableOpacity>
                )
            })}

        </View>
    )
}

export default SizeSelect

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        flexDirection: 'row',
    },
    boxView: {
        height: 40,
        paddingHorizontal:10,
        // minWidth:40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    textOne: {
        fontFamily: Fonts.default,
        fontSize: 13,
        color: Colors.primaryGrayOne
    },
})