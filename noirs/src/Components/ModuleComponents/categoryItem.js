import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '../../theme'

export const CATEGORY_TYPE = {
    SMALL: "small",
    LARGE: "large",
}

const CategoryItem = ({ type, label, data, onPress }) => {

    const defaultLabel = label ? label : "label"

    if (type == CATEGORY_TYPE.SMALL) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={onPress}
                style={[styles.mainContainer, { marginRight: 20 }]}>
                <View style={styles.smallImageView} >
                    <Image source={{ uri: data.picture.avatar.url }} resizeMode="cover" style={{ width: '100%', height: '100%', borderRadius: 50 }} />
                </View>
                
                <View style={[{...StyleSheet.absoluteFillObject},styles.smallImageView]} >
                    <Image source={{ uri: data.picture.image.url }} resizeMode="cover" style={{ width: '100%', height: '100%', borderRadius: 50 }} />
                </View>
                <View style={{ marginTop: 8 }}>
                    <Text style={styles.textOne}>{data.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    else {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={onPress}
                style={[styles.mainContainer, { width: '100%', height: 250, marginBottom: 20 }]}>
                <View style={[styles.smallImageView, { width: '100%', height: 200, borderRadius: 12 }]} >
                    <Image source={{ uri: data.picture.avatar.url }} resizeMode="cover" style={{ width: '100%', height: '100%', borderRadius: 12 }} />
                </View>
                <View style={[{...StyleSheet.absoluteFillObject},styles.smallImageView, { width: '100%', height: 200, borderRadius: 12 }]} >
                    <Image source={{ uri: data.picture.image.url }} resizeMode="cover" style={{ width: '100%', height: '100%', borderRadius: 12 }} />
                </View>
                <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.textTwo}>{data.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

CategoryItem.defaultProps = {
    type: CATEGORY_TYPE.SMALL
}

export default CategoryItem

const styles = StyleSheet.create({
    mainContainer: {
        width: 75,
        height: 100,
        alignItems: 'center',
        // backgroundColor:'red'
    },
    smallImageView: {
        width: 70,
        height: 70,
        borderRadius: 50,
        // backgroundColor:'red'
    },
    textOne: {
        fontFamily: Fonts.bold,
        fontSize: 13,
        color: Colors.primaryGrayOne
    },
    textTwo: {
        fontFamily: Fonts.bold,
        fontSize: 20,
        color: Colors.primaryBlue
    },
})