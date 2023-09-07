import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '../../theme';

const AbstractButton = ({
    width,
    height,
    icon,
    bgcolor,
    label,
    txtSize,
    txtColor,
    onPress,
    BorderRad,
    type,
    normalCase,
    processing,
    disabled,
    disabledFrom,
    iconAndText,
    iconOnly,
    children,
    outline,
    loaderColor
}) => {

    const defaultHeight = height ? height : 50;
    const defaultWidth = width ? width : "100%";
    const defaultColor = bgcolor ? bgcolor : Colors.primaryBlue;
    const defaultLabel = label ? label : "TextHere";
    const defaultLabelTextSize = txtSize ? txtSize : 17;
    const defaultLabelTextColor = txtColor ? txtColor : Colors.primaryBlack;
    const defBorderRad = BorderRad ? BorderRad : 8;
    const defaultLoaderColor = loaderColor ? loaderColor : "black"

    if (iconAndText) {
        return (
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.9}
                disabled={processing || disabled}
                style={[
                    {
                        width: defaultWidth,
                        height: defaultHeight,
                        backgroundColor: defaultColor,
                        borderRadius: defBorderRad,
                        justifyContent: "center",
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.20,
                        shadowRadius: 1.41,
                        elevation: 2,
                    },
                ]}
            >
                {processing ?
                    <ActivityIndicator size={"small"} color={defaultLoaderColor} />
                    :
                    <View style={{ flexDirection: 'row' }}>
                        {icon ? icon() : false}
                        <View style={{marginLeft:10}}>
                            <Text
                                style={{
                                    fontSize: defaultLabelTextSize,
                                    color: defaultLabelTextColor,
                                    fontFamily: Fonts.semiBold,
                                }}>
                                {defaultLabel}</Text>
                        </View>
                    </View>
                }
            </TouchableOpacity>
        )
    }
    if (iconOnly) {
        return (
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.9}
                disabled={processing || disabled}
                style={[
                    {
                        width: defaultWidth,
                        height: defaultHeight,
                        backgroundColor: disabled? "grey":defaultColor,
                        borderRadius: defBorderRad,
                        justifyContent: "center",
                        alignItems: "center",
                    },
                ]}
            >
                {processing ?
                    <ActivityIndicator size={"small"} color={defaultLoaderColor} />
                    :
                    icon ? icon() : false
                }
            </TouchableOpacity>
        )
    }
    if (outline) {
        return (
            <TouchableOpacity
                disabled={processing || disabled}
                activeOpacity={0.9}
                onPress={onPress}
                style={[
                    {
                        width: defaultWidth,
                        height: defaultHeight,
                        backgroundColor: disabled? "grey":"transparent",
                        borderRadius: defBorderRad,
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: Colors.primaryGreen
                    },
                ]}
            >
                {processing ? (
                    <ActivityIndicator size={"small"} color={defaultLoaderColor} />
                ) : (
                    <Text
                        style={{
                            fontSize: defaultLabelTextSize,
                            color: Colors.primaryGreen,
                            fontFamily: Fonts.semiBold,
                        }}
                    >
                        {defaultLabel}
                    </Text>
                )}
            </TouchableOpacity>
        )
    }
    else {
        return (
            <TouchableOpacity
                disabled={processing || disabled}
                activeOpacity={0.9}
                onPress={onPress}
                style={[
                    {
                        width: defaultWidth,
                        height: defaultHeight,
                        backgroundColor: disabled? "grey":defaultColor,
                        borderRadius: defBorderRad,
                        justifyContent: "center",
                        alignItems: "center",
                    },
                ]}
            >
                {processing ? (
                    <ActivityIndicator size={"small"} color={defaultLoaderColor} />
                ) : (
                    <Text
                        style={{
                            fontSize: defaultLabelTextSize,
                            color: defaultLabelTextColor,
                            fontFamily: Fonts.semiBold,
                        }}
                    >
                        {defaultLabel}
                    </Text>
                )}
            </TouchableOpacity>
        )
    }
}

export default AbstractButton

const styles = StyleSheet.create({})