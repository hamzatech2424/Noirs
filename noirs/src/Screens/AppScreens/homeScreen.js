import { StyleSheet, View, NativeModules, FlatList, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../theme';
import HomeHeader from '../../Components/ModuleComponents/homeHeader';
import Carousel from '../../Components/ModuleComponents/carousel';
import CategoryItem, { CATEGORY_TYPE } from '../../Components/ModuleComponents/categoryItem';
import AbstractHeading from '../../Components/AbstractComponents/abstractHeading';
import ProductItem from "../../Components/ModuleComponents/productItem"
import CategoryController, { useCategories } from "../../Controller/categoryController"
import ProductsController, { useAllProducts } from "../../Controller/productsController"
import { navigate } from '../../Navigation/mainNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterMeta } from '../../Store/Slices/productsSlice';
import { FLOW_TYPE } from './productListingScreen';

const { StatusBarManager } = NativeModules;

const HomeScreen = () => {

  const [categoryLoading, setCategoryLoading] = useState(true)
  const [productsLoading, setProductsLoading] = useState(true)
  const [bannerLoading, setBannerLoading] = useState(true)
  const [bannerData, setBannerData] = useState([])
  const allCategories = useCategories()
  const allProducts = useAllProducts()
  const dispatch = useDispatch()
  const userData = useSelector((state)=>state.auth.user)

  useEffect(() => {
    fetchingBanner()
    CategoryController.handleCategories(() => {
      setCategoryLoading(false)
    })
    ProductsController.handleWishList(()=>{
      console.log("WishList Fetched")
    })
    // ProductsController.handleAllProducts(() => {
    //   setProductsLoading(false)
    // })
  }, [])


  const fetchingBanner = () => {
    setBannerLoading(true)
    CategoryController.fetchBanner()
      .then((result) => {
        if (result.length > 0) {
          setBannerData(result)
          setBannerLoading(false)
        }
        else {
          setBannerData([])
          setBannerLoading(false)
        }
      })
      .catch(() => {
        setBannerLoading(false)
      })
  }



  return (
    <View style={styles.mainContainer}>
      <View style={{ height: StatusBarManager.HEIGHT }} />
      <HomeHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={{ width: '100%', height: 225, marginVertical: 10 }}>
          {bannerLoading ?
            <View style={{ height: "100%", width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={"large"} color={Colors.primaryBlue} />
            </View>
            :
            <Carousel data={bannerData} />
          }
        </View>

        <View style={{ width: '90%', alignSelf: 'center' }}>
          <AbstractHeading heading={"Shop By Category"} />
        </View>

        <View style={{ width: '100%', height: 15 }} />

        <View>
          {categoryLoading ?
            <View style={{ height: 100, width: "100%", justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={'large'} color={Colors.primaryBlue} />
            </View>
            :
            <FlatList
              horizontal
              data={allCategories}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => {
                return <CategoryItem data={item}
                  onPress={() => {
                    dispatch(setFilterMeta(item))
                    navigate("Drawer",{categoryData:item,flowType:FLOW_TYPE.MAIN_CATEGORY})
                  }}
                />
              }}
              ListHeaderComponent={() => <View style={{ width: 20 }} />}
              ListFooterComponent={() => <View style={{ width: 20 }} />}
              ListEmptyComponent={() => {
                <View style={{ height: 100, width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                  <Text>No Categories</Text>
                </View>
              }}
            />
          }
        </View>


        <View style={{ width: '90%', alignSelf: 'center' }}>
          <View style={{ marginTop: 20, marginBottom: 15 }}>
            <AbstractHeading heading={"Best Selling - Men"} size={17} />
          </View>
        </View>

        {/* {productsLoading ?
          <View style={{ height: 240, width: "100%", justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} color={Colors.primaryBlue} />
          </View>
          :
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={allProducts}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return <ProductItem data={item} onPress={() => navigate("ProductDetail", { productDetails: item })} />
            }}
            ListHeaderComponent={() => <View style={{ width: 20 }} />}
            ListFooterComponent={() => <View style={{ width: 20 }} />}
            ListEmptyComponent={() => {
              <View style={{ height: 100, width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                <Text>No Product</Text>
              </View>
            }}
          />
        } */}


        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.primaryBackground
  }
})













// const shopByCategory = () => {

//   let tempMain = []
//   let tempMain1 = []

//   for (let i = 0; i < DummyCategories.mainCategory.length; i++) {
//     for (let j = 0; j < DummyCategories.category.length; j++) {
//       if (DummyCategories.mainCategory[i]._id === DummyCategories.category[j].mainCategoryId) {
//         tempMain = [...tempMain, DummyCategories.category[j]]
//       }
//     }
//     tempMain1[i] = { ...DummyCategories.mainCategory[i], category: tempMain }
//     tempMain = []
//   }
//   // console.log(tempMain1[0], "subCategoryArray======>")
//   setShopCategory(tempMain1)

// }