import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AbstractHeader = ({ leftChild, middleChild, rightChild }) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.viewOne}>
                {leftChild ? leftChild() : false}
            </View>
            <View style={styles.viewTwo}>
                {middleChild ? middleChild() : false}
            </View>
            <View style={styles.viewThree}>
                {rightChild ? rightChild() : false}
            </View>
        </View>
    )
}

export default AbstractHeader

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: 50,
        // backgroundColor: 'red',
        flexDirection: 'row'
    },
    viewOne: {
        width: '10%',
        height: "100%",
        // backgroundColor: 'pink'
    },
    viewTwo: {
        width: '80%',
        height: "100%",
        // backgroundColor: 'orange'
    },
    viewThree: {
        width: '10%',
        height: "100%",
        // backgroundColor: 'pink'
    }
})