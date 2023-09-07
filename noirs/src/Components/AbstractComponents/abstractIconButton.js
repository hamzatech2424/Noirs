import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../theme'

const AbstractIconButton = ({ icon, onPress, badge,badgeCount }) => {
    const defaultBadgeCount = badgeCount ? badgeCount : 0
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ paddingHorizontal: 5, paddingVertical: 5, justifyContent: 'center', alignItems: 'center',zIndex:-111 }} >
            {badge ?
                <View style={{ position: "absolute", top:0,right:0,paddingVertical:2,paddingHorizontal:defaultBadgeCount<10?3:2, backgroundColor: Colors.primaryBlue, borderRadius: 10,zIndex:1111 }}>
               <Text style={{color:Colors.primaryWhite,fontSize:8}}>{defaultBadgeCount}</Text>
                </View>
                : false}
            {icon ? icon() : false}
        </TouchableOpacity >
    )
}

export default AbstractIconButton

const styles = StyleSheet.create({})