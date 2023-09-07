import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '../../theme'

const AbstractTextInput = ({ value, onChangeText, label, icon, placeholder, keyboardType, error, styleMode }) => {

    const defaultLabel = label ? label : "text"
    const defaultPlaceholder = placeholder ? placeholder : "text"
    const defaultKeyboardType = keyboardType ? keyboardType : "default"

    return (
        <View style={styles.mainContainer}>
            <View style={{ paddingLeft: 10, paddingBottom: 5 }}>
                <Text style={styles.textOne}>{defaultLabel}</Text>
            </View>
            <View style={{ width: "100%", height: 55, borderRadius: 10, backgroundColor: Colors.primaryGray, flexDirection: "row", alignItems: 'center' }}>
                <View style={{ width:styleMode == "two"?35:50, height: "100%", justifyContent: 'center', alignItems: styleMode == "two"?"flex-end":'center' }} >
                    {icon ? icon() : false}
                </View>
                {styleMode == "two" ? false :
                    <View style={{ width: 2, height: 15, backgroundColor: "#797979" }} />
                }
                <View style={{ flex: 1, height: "100%" }}>
                    <TextInput style={[styles.viewOne, { color: Colors.primaryBlue, fontFamily: Fonts.medium, fontSize:styleMode == "two"?14: 16 }]}
                        placeholder={defaultPlaceholder}
                        placeholderTextColor={'lightgrey'}
                        value={value}
                        onChangeText={onChangeText}
                        autoCapitalize={"none"}
                        keyboardType={defaultKeyboardType}
                    />
                </View>
            </View>
            <View style={{ paddingLeft: 10 }}>
                {error ?
                    <Text style={styles.textTwo}>{`*${error}`}</Text>
                    : false
                }
            </View>
        </View>
    )
}

export default AbstractTextInput

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: 100,
    },
    viewOne: {
        width: '100%',
        height: '100%',
        paddingLeft: 10,
    },
    textOne: {
        fontFamily: Fonts.medium,
        fontSize: 13,
        color: Colors.primaryGreen
    },
    textTwo: {
        fontFamily: Fonts.default,
        fontSize: 12,
        color: "red",
    }
})