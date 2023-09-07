import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import AbstractHeading from '../AbstractComponents/abstractHeading'
import CategoryItem from './categoryItem'
import { navigate } from '../../Navigation/mainNavigation'
import { FLOW_TYPE } from '../../Screens/AppScreens/productListingScreen'

const CategoryDetailItem = ({ data }) => {

    const onPressShopAll = (categoryItem) => {
        // console.log(categoryItem,'categoryDatacategoryData')
        // navigate("ProductListing")
        navigate("Drawer",{categoryData:categoryItem,flowType:FLOW_TYPE.CATEGORY})
    }


    return (
        <View>
            <AbstractHeading heading={data.title} secondHeading={"Shop All"} onPress={()=>onPressShopAll(data)} />
            <View style={{ marginVertical: 12 }}>
                <FlatList
                    horizontal
                    data={data.subCategory}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => {
                        return <CategoryItem data={item} onPress={() => navigate("Drawer",{categoryData:item,flowType:FLOW_TYPE.SUB_CATEGORY})} />
                    }}
                    ListHeaderComponent={() => <View style={{ width: 20 }} />}
                    ListFooterComponent={() => <View style={{ width: 20 }} />}
                    ListEmptyComponent={() => {
                        <View style={{ height: 100, width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                            <Text>No Categories</Text>
                        </View>
                    }}
                />
            </View>
        </View>
    )
}

export default CategoryDetailItem

const styles = StyleSheet.create({})