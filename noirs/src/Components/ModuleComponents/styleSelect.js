import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors, Fonts } from '../../theme'


const StyleSelect = ({ data, onChangeSelected }) => {

    const [styleData, setStyleData] = useState([])

    useEffect(() => {
        if (data) {
            const newArr = [...data]
            const styleArr = newArr.map((item) => ({ _id: Math.floor(Math.random() * 211321), title: item, active: false }))
            const indexFirstOfArray = {...styleArr[0],active:true}
            styleArr[0] = indexFirstOfArray
            onChangeSelected(styleArr[0]?.title)
            setStyleData(styleArr)
        }
    }, [data])


    const onPressAnySelect = (it) => {
        const newArr = [...styleData]
        const newModifiedArr = newArr.map((item) => item._id == it._id ? { ...item, active: true } : { ...item, active: false })
        onChangeSelected(it?.title)
        setStyleData(newModifiedArr)
    }

    return (
        <View style={styles.mainContainer}>

            {styleData.map((item, index) => {
                return (
                    <TouchableOpacity
                        style={[styles.boxView, { paddingHorizontal: 10, borderRadius: 6, backgroundColor: '#F5F5F5', borderColor: item?.active ? Colors.primaryBlack : "transparent", borderWidth: item?.active ? 1 : 0 }]}
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

export default StyleSelect

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        flexDirection: 'row',
    },
    boxView: {
        height: 40,
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