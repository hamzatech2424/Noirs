import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '../../theme'
import HeartButton from './heartButton'
import AbstractButton from '../AbstractComponents/abstractButton'
import { navigate } from '../../Navigation/mainNavigation'

const WishlistItem = ({ data }) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.viewOne}>

                <View style={{ width: 100, height: 100, borderRadius: 4 }}>
                    {Object.keys(data).length > 0 ?
                        <Image source={{ uri: data?.pictures[0]?.image?.url }} style={{ width: "100%", height: "100%", borderRadius: 4 }} />
                        :
                        <View style={{ width: "100%", height: '100%', borderRadius: 4 }} />
                    }
                </View>
            </View>

            <View style={styles.viewTwo}>

                <View>
                    <Text style={styles.textTwo}>{data?.title}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
                    <Text style={styles.textThree}>{`$ ${data?.price}`}</Text>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.textFour}>$15.99</Text>
                    </View>
                </View>

                <View>
                    <AbstractButton height={40}
                    txtColor={Colors.primaryWhite}
                    label={"Details"}
                    txtSize={14}
                    onPress={()=>navigate("ProductDetail", { productDetails: data })}
                    />
                </View>
            </View>

            <View style={styles.viewThree}>
                <HeartButton data={data} />
            </View>

        </View>
    )
}

export default WishlistItem

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        paddingBottom: 20,
        borderBottomColor: Colors.primaryGray,
        borderBottomWidth: 1,
        flexDirection: 'row',
        height: 115,
        marginTop: 15
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