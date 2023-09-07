import { StyleSheet, FlatList, View, NativeModules, ActivityIndicator, TouchableOpacity, Text, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AbstractContentContainer from '../../Components/AbstractComponents/abstractContentContainer';
import { Colors, Fonts } from '../../theme';
import AbstractHeader from '../../Components/AbstractComponents/abstractHeader';
import { goBack, navigate } from '../../Navigation/mainNavigation';
import BackArrowSvg from "../../Assets/Icons/backArrowSvg"
import CartSvg from "../../Assets/Icons/cartSvg"
import FilterSvg from "../../Assets/Icons/filterSvg"
import AbstractIconButton from '../../Components/AbstractComponents/abstractIconButton';
import AbstractSearchBar from '../../Components/AbstractComponents/abstractSearchBar';
import ProductItem from '../../Components/ModuleComponents/productItem';
import Carousel from '../../Components/ModuleComponents/carousel';
import ProductDetailCarousel from '../../Components/ModuleComponents/productDetailCarousel';
import StarRating from '../../Components/ModuleComponents/starRating';
import ColorSelect from '../../Components/ModuleComponents/colorSelect';
import StyleSelect from '../../Components/ModuleComponents/styleSelect';
import SizeSelect from '../../Components/ModuleComponents/sizeSelect';
import ReviewItem from '../../Components/ModuleComponents/reviewItem';
import AbstractHeading from '../../Components/AbstractComponents/abstractHeading';
import AbstractButton from '../../Components/AbstractComponents/abstractButton';
import ProductsController from '../../Controller/productsController';
import Placeholder from '../../Components/Placeholders/placeholder';
import IncAndDecButtons from '../../Components/ModuleComponents/incAndDecButtons';
import CartController from '../../Controller/cartController';
import CartButtonCount from '../../Components/ModuleComponents/cartButtonCount';

const { StatusBarManager } = NativeModules;

const ProductDetailScreen = ({ route }) => {

  const { productDetails, categoryData } = route?.params
  const [productLoading, setProductLoading] = useState(true)
  const [productDataDetails, setProductDataDetails] = useState({})
  const [myQuantity, setMyQuantity] = useState(0)
  const [buttonActive, setButtonActive] = useState(true)
  const [sizeState, setSizeState] = useState("")
  const [colorState, setColorState] = useState("")
  const [styleState, setStyleState] = useState("")
  const [variantCombinationMake, setVariantCombinationMake] = useState("")
  const [productQuantity, setProductQuantity] = useState(productDataDetails?.totalQuantity ? productDataDetails?.totalQuantity : 0)
  const [addingLoading, setAddingLoading] = useState(false)
  const [variantExists,setVariantExists] = useState(false)


  useEffect(() => {
    ProductsController.fetchSingleProduct(productDetails?._id)
      .then((result) => {
        setProductDataDetails(result)
      })
      .catch((error) => {
        console.log(error, 'Error in fetchSingleProduct')
      })
      .finally(() => {
        setProductLoading(false)
        setButtonActive(false)
      })

  }, [])


  // useEffect(() => {
  //   if (productDataDetails) {
  //     if (productDataDetails?.totalQuantity > 0) {
  //       setButtonActive(false)
  //     }
  //     else {
  //       setButtonActive(true)
  //     }
  //   }
  // }, [productDataDetails])



  useEffect(() => {
    if (sizeState) {
      variantCombinationPrepare(sizeState, colorState, styleState)
    }
    else if (colorState) {
      variantCombinationPrepare(sizeState, colorState, styleState)
    }
    else {
      variantCombinationPrepare(sizeState, colorState, styleState)
    }

  }, [sizeState, colorState, styleState])


  useEffect(() => {

    if (variantCombinationMake?.length > 0) {
      if (productDataDetails?.variants?.length > 0) {
        const findVariant = productDataDetails?.variants?.find((item) => item?.combination == variantCombinationMake)
        // console.log(findVariant, 'findVariantfindVariant')
        if (findVariant != undefined) {
          setVariantExists(true)
          ProductsController.checkAvailabilityOfProduct(productDataDetails?._id, findVariant?._id)
            .then((result) => {
              // console.log(result, 'resultresult')
              if (result?.quantity > 0) {
                setProductQuantity(result?.quantity)
                setButtonActive(false)
              }
              else {
                setProductQuantity(result?.quantity)
                setButtonActive(true)
              }
            })
            .catch((error) => {
              console.log(error, 'Error in checkAvailabilityOfProduct')
            })
        }
        else {
          setProductQuantity(productDataDetails?.totalQuantity)
        }
      }
      else {
        console.log("This product has no variant")
        setVariantExists(false)
        // Alert.alert("Variant not Exist")
      }
    }
  }, [variantCombinationMake])


  const onChangeSelectedColor = (color) => {
    // console.log('selectedColor ==>', color)
    setColorState(color)
  }

  const onChangeSelectedSize = (size) => {
    // console.log('selectedSize ==>', size)
    setSizeState(size)
  }

  const onChangeSelectedStyle = (style) => {
    // console.log('selectedStyle ==>', style)
    setStyleState(style)
  }


  const variantCombinationPrepare = (size, color, style) => {
    setVariantCombinationMake(`${size}/${color}/${style}`)
  }

  const onProductQuantitySelect = (quant) => {
    setMyQuantity(quant)
  }

  const onPressAddToCart = () => {
    // console.log(productDataDetails, 'ProductDataDetails=======>')
    // console.log(myQuantity, 'quantity=======>')
    setAddingLoading(true)

    const findVariant = productDataDetails?.variants?.find((item) => item?.combination == variantCombinationMake)
    if (findVariant != undefined) {
      const productObject = {
        cartedQuantity: myQuantity,
        product: productDataDetails?._id,
        variantId: findVariant?._id
      }
      CartController.addProductToCart(productObject)
        .then((result) => {
          console.log(result, 'result============>')
          CartController.handleFetchCart(() => {
            setAddingLoading(false)
          })
        })
        .catch((error) => {
          console.log(error, 'Error in addProductToCart')
          setAddingLoading(false)
        })
    }
    else {
      console.log("This product has no variant")
      setAddingLoading(false)
    }

  }




  return (
    <View style={styles.mainContainer}>
      <View style={{ height: StatusBarManager.HEIGHT }} />
      <View style={{ width: '90%', alignSelf: 'center' }}>
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
          middleChild={() => (<View
            style={{ width: '100%', height: "100%", justifyContent: 'center', alignItems: "center" }}
          >
            <Text style={styles.textNine}>Details</Text>
          </View>)}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ width: '100%', height: 353 }}>
          <ProductDetailCarousel data={productDetails} />
        </View>

        <View style={{ width: '90%', alignSelf: 'center' }}>
          <View style={{ marginTop: 10 }} >
            {productLoading ? <Placeholder /> :
              <Text style={styles.textOne}>{productDataDetails?.title}</Text>
            }
          </View>

          <View style={{ flexDirection: "row", alignItems: 'center', marginVertical: 10 }}>
            {productLoading ? <Placeholder width={130} /> :
              <>
                <StarRating />
                <View style={{ marginLeft: 10 }}>
                  <Text style={[styles.textTwo, { color: Colors.primaryGrayThree, fontSize: 16, fontFamily: Fonts.default }]}>4.5 (12)</Text>
                </View>
              </>
            }
          </View>

          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            {productLoading ? <Placeholder width={250} /> :
              <>
                <Text style={styles.textFour}>$ {`${productDataDetails?.price}`}</Text>
                <View style={{ marginLeft: 10 }}>
                  <Text style={[styles.textTwo, { color: Colors.primaryGrayThree, fontSize: 14, fontFamily: Fonts.default, textDecorationLine: "line-through" }]}>$15.99</Text>
                </View>

                <View style={{ backgroundColor: Colors.primaryPink, paddingHorizontal: 8, marginLeft: 10 }}>
                  <Text style={styles.textFive}>{`Summer Sale - ${productDataDetails?.discount} % Off`}</Text>
                </View>
              </>
            }
          </View>

          <View style={{ marginTop: 15, marginBottom: 15 }}>
            {productLoading ?
              <View style={{ flexDirection: 'row' }}>
                <Placeholder width={40} height={40} customStyle={{ marginRight: 10 }} />
                <Placeholder width={40} height={40} customStyle={{ marginRight: 10 }} />
                <Placeholder width={40} height={40} customStyle={{ marginRight: 10 }} />
                <Placeholder width={40} height={40} customStyle={{ marginRight: 10 }} />
              </View>
              : productDataDetails?.color.length > 0 ?
                <ColorSelect data={productDataDetails?.color ? productDataDetails?.color : []} onChangeSelected={onChangeSelectedColor} />
                : false
            }
          </View>

          <View style={{ marginBottom: 15 }}>
            {productLoading ?
              <View style={{ flexDirection: 'row' }}>
                <Placeholder width={50} height={40} customStyle={{ marginRight: 10 }} />
                <Placeholder width={50} height={40} customStyle={{ marginRight: 10 }} />
                <Placeholder width={50} height={40} customStyle={{ marginRight: 10 }} />
                <Placeholder width={50} height={40} customStyle={{ marginRight: 10 }} />
              </View>
              :
              productDataDetails?.style.length > 0 ?
                <StyleSelect data={productDataDetails?.style ? productDataDetails?.style : []} onChangeSelected={onChangeSelectedStyle} />
                : false
            }
          </View>

          <View style={{ marginBottom: 15 }}>
            {productLoading ?
              <View style={{ flexDirection: 'row' }}>
                <Placeholder width={45} height={40} customStyle={{ marginRight: 10 }} />
                <Placeholder width={45} height={40} customStyle={{ marginRight: 10 }} />
                <Placeholder width={45} height={40} customStyle={{ marginRight: 10 }} />
              </View>
              : productDataDetails?.size.length > 0 ?
                <SizeSelect data={productDataDetails?.size ? productDataDetails?.size : []} onChangeSelected={onChangeSelectedSize} />
                : false
            }
          </View>


          <View style={{ marginBottom: 15 }}>
            {productLoading ?
              <Placeholder width={100} height={50} /> :
              <IncAndDecButtons maxValue={productQuantity} initialValue={0} onProductQuantitySelect={onProductQuantitySelect} />
            }
          </View>


          <View style={{ marginBottom: 15 }}>
            {productLoading ?
              <Placeholder width={100} /> :
              productQuantity > 0 ?
                <Text style={styles.textEight}>{`${productQuantity} in Stock`}</Text>
                :
                <Text style={styles.textEight}>{`Out of Stock`}</Text>
            }
          </View>

          <View>
            <AbstractHeading mainHeadingTextSize={15} heading={"Description & Details"} />
          </View>

          <View>
            {productLoading ?
              <Placeholder width={"100%"} height={150} /> :
              <Text style={styles.textSix}>{productDataDetails?.description}</Text>
            }
          </View>


          <View style={{ marginTop: 15 }}>
            <AbstractHeading mainHeadingTextSize={15} heading={"Ratings & Reviews"} />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            {productLoading ?
              <Placeholder width={200} height={40} /> :
              <>
                <View style={{ marginRight: 10 }}>
                  <Text style={styles.textSeven}>4.5</Text>
                </View>
                <View>
                  <StarRating size={20} />
                </View>
              </>
            }
          </View>

          <View>
          </View>

          <View style={{ marginTop: 10 }}>
            <AbstractHeading mainHeadingTextSize={15} secondHeadingTextSize={11} heading={"Reviews: 43"} secondHeading={'View All'} />
          </View>

          {productLoading ?
            <>
              <View style={{ marginBottom: 3 }}>
                <Placeholder width={"100%"} height={110} />
              </View>
              <View style={{ marginBottom: 3 }}>
                <Placeholder width={"100%"} height={110} />
              </View>
            </>
            :
            <>
              <ReviewItem />
              <ReviewItem />
            </>
          }

        </View>
        <View style={{ width: '100%', height: 100 }} />
      </ScrollView>

      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: Colors.primaryWhite, paddingBottom: 15 }}>
        <View style={{ width: '90%', alignSelf: 'center', marginTop: 10, marginBottom: 10 }}>
          <AbstractButton
            onPress={onPressAddToCart}
            // disabled={buttonActive}
            disabled={buttonActive || variantExists == false}
            processing={addingLoading}
            txtColor={Colors.primaryWhite} label={"Add to Cart"}
            loaderColor={Colors.primaryWhite}
          />
        </View>
      </View>

    </View>
  )
}

export default ProductDetailScreen


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
    fontSize: 16,
    color: Colors.primaryBlue
  },
  textThree: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.primaryBlack
  },
  textFour: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: Colors.primaryBlack
  },
  textFive: {
    fontFamily: Fonts.default,
    fontSize: 12,
    color: Colors.primaryWhite
  },
  buttonView: {
    backgroundColor: Colors.primaryGray,
    height: 28,
    width: 85,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textSix: {
    fontFamily: Fonts.default,
    fontSize: 13,
    color: Colors.primaryGrayOne
  },
  textSeven: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: Colors.primaryBlack
  },
  textEight: {
    fontFamily: Fonts.semiBold,
    fontSize: 13,
    color: Colors.primaryBlack
  },
  textNine: {
    fontFamily: Fonts.bold,
    fontSize: 19,
    color: Colors.primaryBlue
  },
})















