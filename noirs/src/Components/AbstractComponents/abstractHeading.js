import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '../../theme'
import ArrowForwardSvg from "../../Assets/Icons/arrowForwardSvg"

const AbstractHeading = ({ heading, seeAll ,onPress,secondHeading,mainHeadingTextSize,secondHeadingTextSize}) => {

    const defaultHeading = heading ? heading : "text"
    const defaultSecondHeading = secondHeading ? secondHeading : "See All"
    const defaultMainHeadingTextSize = mainHeadingTextSize ? mainHeadingTextSize : 17
    const defaultSecondHeadingTextSize = secondHeadingTextSize ? secondHeadingTextSize : 13

    return (
        <View style={styles.mainContainer}>
            <Text style={[styles.textOne,{fontSize:defaultMainHeadingTextSize}]}>{defaultHeading}</Text>

            {secondHeading ?
                <TouchableOpacity
                activeOpacity={0.9}
                onPress={onPress}
                style={{ flexDirection: 'row', alignItems: 'center', height: '100%' }}>
                    <Text style={[styles.textTwo,{fontSize:defaultSecondHeadingTextSize}]}>{defaultSecondHeading}</Text>
                    <View style={{ marginLeft: 5 }}>
                        <ArrowForwardSvg />
                    </View>
                </TouchableOpacity>
                : false}

        </View>
    )
}

export default AbstractHeading

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
    },
    textOne: {
        fontFamily: Fonts.bold,
        fontSize: 17,
        color: Colors.primaryBlue
    },
    textTwo: {
        fontFamily: Fonts.bold,
        fontSize: 13,
        color: Colors.primaryBlue
    },
})