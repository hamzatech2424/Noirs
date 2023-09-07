import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Fonts } from '../../theme'
import StarSvg from '../../Assets/Icons/starSvg'

const RadioButton = ({ onPress, data, stars }) => {

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={onPress}
            style={styles.mainContainer}>
            <View style={{ width: 24, height: 24, borderWidth: 2.2, borderColor: Colors.primaryBlue, borderRadius: 24, justifyContent: "center", alignItems: "center" }}>
                {data.active ?
                    <View style={{ width: 12, height: 12, backgroundColor: Colors.primaryBlue, borderRadius: 12 }} />
                    : false}
            </View>
            <View style={{ marginLeft: 10 }}>
                {stars ?
                    (typeof data.title == "number")
                        ?
                        <View style={{flexDirection:'row'}}>
                        {data.array.map((item, index) => <StarSvg key={index} />)}
                        </View>
                        :
                        <Text style={styles.textOne}>{data.title}</Text>
                    :
                    <Text style={styles.textOne}>{data.title}</Text>}
            </View>
        </TouchableOpacity>
    )
}

export default RadioButton

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        flexDirection: "row",
        alignItems: 'center',
        marginVertical: 3
    },
    textOne: {
        fontFamily: Fonts.default,
        fontSize: 14,
        color: Colors.primaryGrayOne
    },
})