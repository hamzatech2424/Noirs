import { StyleSheet, FlatList, View, NativeModules,ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import AbstractContentContainer from '../../Components/AbstractComponents/abstractContentContainer';
import { Colors } from '../../theme';
import { DummyCategories } from '../../MocData';
import CategoryItem, { CATEGORY_TYPE } from '../../Components/ModuleComponents/categoryItem';
import AbstractHeading from '../../Components/AbstractComponents/abstractHeading';
import CategoryController, { useCategories } from '../../Controller/categoryController';
import { navigate } from '../../Navigation/mainNavigation';

const { StatusBarManager } = NativeModules;

const CategoriesScreen = () => {

  const [categoryLoading, setCategoryLoading] = useState(true)
  const allCategories = useCategories()


  useEffect(() => {
    CategoryController.handleCategories(() => {
      setCategoryLoading(false)
    })
  }, [])


  return (
    <View style={styles.mainContainer}>
      <View style={{ height: StatusBarManager.HEIGHT }} />
      <AbstractContentContainer>
        <View style={{ marginTop: 10, marginBottom: 10 }} >
          <AbstractHeading heading={"Shop By Category"} />
        </View>
        {categoryLoading ?
          <View style={{ flex:1 ,width: "100%", justifyContent: 'center', alignItems: 'center',paddingBottom:100 }}>
            <ActivityIndicator size={'large'} color={Colors.primaryBlue} />
          </View>
          :
          <FlatList
            showsVerticalScrollIndicator={false}
            data={allCategories}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return <CategoryItem data={item} type={CATEGORY_TYPE.LARGE} onPress={()=> navigate("CategoriesDetails",{categoryData:item}) } />
            }}
            ListEmptyComponent={() => {
              <View style={{ flex:1,width: "100%", justifyContent: 'center', alignItems: 'center',paddingBottom:100 }}>
                <Text>No Categories</Text>
              </View>
            }}
          />
        }
        <View style={{ width: 100 }} />
      </AbstractContentContainer>
    </View>
  )
}

export default CategoriesScreen


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.primaryBackground
  }
})