import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Colors } from '../../theme'
import AbstractIconButton from '../AbstractComponents/abstractIconButton'
import SearchSvg from '../../Assets/Icons/searchSvg'
import CartSvg from '../../Assets/Icons/cartSvg'
import { navigate } from '../../Navigation/mainNavigation'
import CartButtonCount from './cartButtonCount'

const HomeHeader = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={{width:"90%",height:"100%",alignSelf:'center',flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{width:120,height:"100%",justifyContent:"center"}}>
            <Image source={require('../../Assets/Images/logo.png')} style={{width:"85%",height:"60%"}} />
            </View>
            <View style={{ flexDirection: "row", justifyContent:'space-between',alignItems: 'center',height:'100%',width:"22%" }}>
              {/* <AbstractIconButton icon={()=><SearchSvg />} /> */}
              {/* <AbstractIconButton icon={()=><CartSvg /> } badge badgeCount={100} onPress={()=>navigate("Cart")} /> */}
              <CartButtonCount />
            </View>
            </View>
        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: 40,
        backgroundColor: Colors.primaryBackground,
    }
})