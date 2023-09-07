import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '../../theme'
import StarRating from "../../Components/ModuleComponents/starRating"
import HeartButton from "../../Components/ModuleComponents/heartButton"

const ProductItem = ({ data, noMargin, marginBottom, onPress }) => {

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={[styles.mainContainer, { marginRight: noMargin ? 0 : 20, marginBottom: marginBottom ? 20 : 0 }]}>
            <View style={styles.imageView} >
                <View style={{ ...StyleSheet.absoluteFillObject }} >

                    <Image source={{ uri: data?.pictures[0].avatar.url }} style={{ width: '100%', height: '100%' }} resizeMode={"cover"} />
                    <View style={{ ...StyleSheet.absoluteFillObject }} >
                        <Image source={{ uri: data?.pictures[0].image.url }} style={{ width: '100%', height: '100%' }} resizeMode={"cover"} />
                    </View>

                </View>
                <View style={{ ...StyleSheet.absoluteFillObject }} >
                    <View style={{ position: "absolute", right: 10, top: 10 }}>
                        <HeartButton data={data} />
                    </View>

                    <View style={{ position: "absolute", left: 10, top: 15 }}>
                        <View style={{ backgroundColor: Colors.primaryPink, paddingHorizontal: 8 }}>
                            <Text style={styles.textThree}>{`${data?.discount} %`}</Text>
                        </View>
                    </View>


                </View>
            </View>
            <View style={{ flex: 1, width: '100%', justifyContent: 'space-between', paddingVertical: 5 }} >
                <View>
                    <Text style={styles.textOne}>{data?.title}</Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                    <StarRating />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={[styles.textTwo, { color: Colors.primaryGrayThree, fontSize: 12, fontFamily: Fonts.default }]}>4.5 (12)</Text>
                    </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.textTwo}>$ {`${data?.price}`}</Text>
                    <View style={{ marginLeft: 10 }}>
                        {data?.discount == 0 ? false :
                            <Text style={[styles.textTwo, { color: Colors.primaryGrayThree, fontSize: 12, fontFamily: Fonts.default, textDecorationLine: "line-through" }]}>$15.99</Text>
                        }
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    mainContainer: {
        width: 160,
        height: 240,
        // marginRight: 20
        // backgroundColor: "pink"
    },
    imageView: {
        width: "100%",
        height: 160,
        // backgroundColor: 'red'
    },
    textOne: {
        fontFamily: Fonts.bold,
        fontSize: 14,
        color: Colors.primaryBlack
    },
    textTwo: {
        fontFamily: Fonts.bold,
        fontSize: 14,
        color: Colors.primaryBlack
    },
    textThree: {
        fontFamily: Fonts.default,
        fontSize: 12,
        color: Colors.primaryWhite
    },
})