import { StyleSheet, FlatList, View, NativeModules, ActivityIndicator, TouchableOpacity, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AbstractContentContainer from '../../Components/AbstractComponents/abstractContentContainer';
import { Colors, Fonts } from '../../theme';
import AbstractHeader from '../../Components/AbstractComponents/abstractHeader';
import { goBack, navigate, openDrawer } from '../../Navigation/mainNavigation';
import BackArrowSvg from "../../Assets/Icons/backArrowSvg"
import CartSvg from "../../Assets/Icons/cartSvg"
import FilterSvg from "../../Assets/Icons/filterSvg"
import AbstractIconButton from '../../Components/AbstractComponents/abstractIconButton';
import AbstractSearchBar from '../../Components/AbstractComponents/abstractSearchBar';
import ProductsController, { useAllProducts } from '../../Controller/productsController';
import ProductItem from '../../Components/ModuleComponents/productItem';
import CartButtonCount from '../../Components/ModuleComponents/cartButtonCount';

const { StatusBarManager } = NativeModules;

export const FLOW_TYPE = {
  MAIN_CATEGORY: "main_Category",
  CATEGORY: "category",
  SUB_CATEGORY: "sub_Category"
}

const ProductListingScreen = ({ route }) => {

  const { categoryData, flowType } = route.params
  const allProducts = useAllProducts()
  const [searchStr, setSearchStr] = useState("")
  const [searchedData, setSearchedData] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [productLoading, setProductLoading] = useState(false)



  useEffect(() => {
    setSearchedData(allProducts)
    setMasterDataSource(allProducts)
  }, [allProducts])


  useEffect(() => {
    if (flowType == FLOW_TYPE.MAIN_CATEGORY) {
      console.log(FLOW_TYPE.MAIN_CATEGORY, '====>')
      setProductLoading(true)
      ProductsController.handleFetchedRandomProductsWithMainCategory(categoryData._id, () => {
        setProductLoading(false)
      })
    }
    if (flowType == FLOW_TYPE.CATEGORY) {
      console.log(FLOW_TYPE.CATEGORY, '====>')
      setProductLoading(true)
      ProductsController.handleFetchedRandomProductsWithCategory(categoryData._id, () => {
        setProductLoading(false)
      })
    }
    if (flowType == FLOW_TYPE.SUB_CATEGORY) {
      console.log(FLOW_TYPE.CATEGORY, '====>')
      setProductLoading(true)
      ProductsController.handleFetchRandomProductsWithSubCategory(categoryData._id, () => {
        setProductLoading(false)
      })
    }
  }, [])



  const searchForProduct = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setSearchedData(newData);
      setSearchStr(text);
    } else {
      setSearchedData(masterDataSource);
      setSearchStr(text);
    }
  };


  const onPressFilterButton = () => {
    openDrawer()
  }



  return (
    <View style={styles.mainContainer}>
      <View style={{ height: StatusBarManager.HEIGHT }} />
      <AbstractContentContainer>
        <AbstractHeader
          leftChild={() => (
            <TouchableOpacity
              style={{ width: '100%', height: "100%", justifyContent: 'center', alignItems: "flex-start" }}
              activeOpacity={0.9}
              onPress={() => goBack()}
            >
              <BackArrowSvg />
            </TouchableOpacity>
          )}
          rightChild={() => (
            <CartButtonCount />
          )}
          middleChild={() => (
            <View
              style={{ width: '96%', height: "100%", justifyContent: 'center', alignItems: "center" }}
            >
              <AbstractSearchBar
                value={searchStr}
                onChangeText={searchForProduct}
              />
            </View>
          )}
        />

        <View style={{ width: '100%', marginVertical: 10 }}>
          <View style={{ marginBottom: 10 }}>
            {/* {searchedData.length > 0} */}
            {searchStr.length > 0 ?
              <Text>{`${searchedData.length} Results Found`}</Text>
              :
              <Text>{`${allProducts.length} Results Found`}</Text>
            }
          </View>
        
        {flowType != FLOW_TYPE.SUB_CATEGORY ?
          <TouchableOpacity
            style={styles.buttonView}
            onPress={onPressFilterButton}
          >
            <View style={{ flexDirection: 'row', alignContent: 'center', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <FilterSvg />
              <View style={{ marginLeft: 5 }}><Text style={styles.textTwo}>Filters</Text></View>
            </View>
          </TouchableOpacity>
          :false}
        </View>



        {productLoading ?
          <View style={{ height: 240, width: "100%", justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} color={Colors.primaryBlue} />
          </View>
          :
          <FlatList
            showsVerticalScrollIndicator={false}
            // horizontal
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            numColumns={2}
            data={searchedData}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return <ProductItem data={item} noMargin marginBottom onPress={() => navigate("ProductDetail", { productDetails: item })} />
            }}
            ListEmptyComponent={() => {
              <View style={{ height: 100, width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                <Text>No Product</Text>
              </View>
            }}
          />
        }

      </AbstractContentContainer>
    </View>
  )
}

export default ProductListingScreen


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.primaryBackground
  },
  textOne: {
    fontFamily: Fonts.bold,
    fontSize: 19,
    color: Colors.primaryBlue
  },
  textTwo: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    color: Colors.primaryBlue
  },
  buttonView: {
    backgroundColor: Colors.primaryGray,
    height: 28,
    width: 85,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
})