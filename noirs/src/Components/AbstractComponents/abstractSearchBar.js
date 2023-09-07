import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { Colors } from '../../theme'
import SearchSvg from '../../Assets/Icons/searchSvg'

const AbstractSearchBar = ({value,onChangeText,searchForProduct}) => {
    return (
        <View style={styles.mainContainer}>
            <View style={{ width: "18%", height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <SearchSvg color={'#9A9A9A'} />
            </View>
            <View style={{ width: "82%", height: '100%', }}>
                <TextInput
                    style={{ width: "93%", height: "100%",fontSize:14 }}
                    placeholder={"Search"}
                    value={value}
                    onChangeText={onChangeText}
                    onClear={(text) => searchForProduct('')}
                />
            </View>
        </View>
    )
}

export default AbstractSearchBar

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '100%',
        height: 42,
        borderRadius: 50,
        backgroundColor: Colors.primaryGray,
        flexDirection: 'row'
    }
})