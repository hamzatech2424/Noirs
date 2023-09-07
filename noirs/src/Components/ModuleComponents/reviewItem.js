import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import StarRating from './starRating'
import { Colors, Fonts } from '../../theme'

const ReviewItem = () => {
    return (
        <TouchableOpacity
        activeOpacity={0.8}
        style={{ marginTop: 10, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.primaryGray }}>
            <View style={{ width: "100%", flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.textOne}>Jake Michael</Text>
                    <View style={{ marginLeft: 10 }}>
                        <StarRating />
                    </View>
                </View>
                <View>
                    <Text style={styles.textTwo}>20 Dec, 2022</Text>
                </View>
            </View>

            <View style={{marginTop:10,marginBottom:2}}>
                <Text style={styles.textThree}>Loved the Stuff, Recommended!</Text>
            </View>

            <View>
                <Text style={styles.textFour}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras varius urna a urna rutrum mattis...</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ReviewItem

const styles = StyleSheet.create({
    textOne: {
        fontFamily: Fonts.default,
        fontSize: 13,
        color: Colors.primaryGrayOne
    },
    textTwo: {
        fontFamily: Fonts.default,
        fontSize: 11,
        color: Colors.primaryGrayOne
    },
    textThree: {
        fontFamily: Fonts.semiBold,
        fontSize: 13,
        color: Colors.primaryBlack
    },
    textFour: {
        fontFamily: Fonts.default,
        fontSize: 13,
        color: Colors.primaryGrayOne
    },
})