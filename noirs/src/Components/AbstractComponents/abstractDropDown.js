import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { Colors, Fonts } from '../../theme';

const AbstractDropDown = ({ item, onPress,onSelectValue }) => {

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [data, setData] = useState([])

    const renderLabel = () => {
        return (
            <Text style={[styles.label, isFocus && { color: Colors.primaryBlue }]}>
                {item?.title}
            </Text>
        );
    };

    useEffect(() => {
        if (item?.subCategory.length > 0) {
            const modifiedItemsArray = item?.subCategory.map((it) => ({ ...it, label: it.title, value: it.title }))
            setData(modifiedItemsArray)
        }
        if (!item?.active) {
            setValue(null)
        }
    }, [item])


    return (
        <View style={styles.container}>
            {renderLabel()}
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: Colors.primaryBlue }]}
                placeholderStyle={[{color:isFocus?Colors.primaryBlue:"grey",fontSize:11}]}
                //   inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search={false}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select' : '...'}
                searchPlaceholder="Search..."
                fontFamily={Fonts.default}
                itemContainerStyle={{ width: '100%' }}
                itemTextStyle={{ fontSize: 12, width: '100%', position: 'absolute', left: 10 }}
                selectedTextStyle={{ fontSize: 12 }}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                    onSelectValue(item,item.value)
                    onPress()
                }}
            />
        </View>
    )
}

export default AbstractDropDown

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 16,
        marginVertical: 5
    },
    dropdown: {
        height: 40,
        borderColor: Colors.primaryBlue,
        borderWidth: 1.2,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 5,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 13,
        fontWeight: 'bold',
        color: Colors.primaryBlue
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    // inputSearchStyle: {
    //   height: 40,
    //   fontSize: 16,
    // },
});




// const data = [
//     { label: 'Item 1', value: '1' },
//     { label: 'Item 2', value: '2' },
//     { label: 'Item 3', value: '3' },
//     { label: 'Item 4', value: '4' },
//     { label: 'Item 5', value: '5' },
//     { label: 'Item 6', value: '6' },
//     { label: 'Item 7', value: '7' },
//     { label: 'Item 8', value: '8' },
// ];