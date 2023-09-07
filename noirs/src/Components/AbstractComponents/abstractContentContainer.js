import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AbstractContentContainer = ({ children }) => {
    return (
        <View style={{ flex: 1, width: '90%', alignSelf: 'center' }}>
            {children}
        </View>
    )
}

export default AbstractContentContainer

const styles = StyleSheet.create({})