import { StyleSheet, FlatList, View, NativeModules, ActivityIndicator, TouchableOpacity, Text, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import AbstractContentContainer from '../../Components/AbstractComponents/abstractContentContainer';
import { Colors, Fonts } from '../../theme';
import AbstractHeader from '../../Components/AbstractComponents/abstractHeader';
import { goBack, navigate } from '../../Navigation/mainNavigation';
import BackArrowSvg from "../../Assets/Icons/backArrowSvg"
import CartSvg from "../../Assets/Icons/cartSvg"
import CartItem from '../../Components/ModuleComponents/cartItem';
import AbstractButton from '../../Components/AbstractComponents/abstractButton';
import CartController, { useCart } from "../../Controller/cartController"
import Placeholder from '../../Components/Placeholders/placeholder';
import CartFillSvg from '../../Assets/Icons/cartFillSvg';

const SW = Dimensions.get("screen").width
const SH = Dimensions.get("screen").height

const { StatusBarManager } = NativeModules;

const SHIPPING_COST = 0.99
const DISCOUNT = 20

const CartScreen = ({ route }) => {

  const cart = useCart()
  const [loading, setLoading] = useState(false)
  const [placeholderLoading, setPlaceholderLoading] = useState(true)
  const [totalPrice, setTotalPrice] = useState(0)
  const [discountedPrice, setDiscountedPrice] = useState(0)

  const onPressCheckout = () => {
    navigate("CheckOut")
  }

  useEffect(() => {
    setLoading(true)
    CartController.handleFetchCart(() => {
      setLoading(false)
      setPlaceholderLoading(false)
    })
  }, [])

  useEffect(() => {

    let price = 0
    cart?.items?.map((item) => {
      price = price + item?.cartedQuantity * item?.product?.price
    })
    // console.log(price, 'Price ==========>>>>>>>>>>>>>>')
    discountCalculations(price, DISCOUNT)
    if (cart?.items?.length == 0) {
      setTotalPrice(0)
      setDiscountedPrice(0)
    }
    // console.log(cart.items[0].cartedQuantity,'cartcartcartcartcartcart')
    // console.log(cart.items[0].productId.price,'cartcartcartcartcartcart')


  }, [cart])

  // console.log(cart)


  const discountCalculations = (value, discountPercent) => {
    const discountedPrice = Math.ceil(discountPercent / 100 * value)
    setDiscountedPrice(discountedPrice)
    setTotalPrice(Math.ceil(value - discountedPrice))

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
          //   rightChild={() => (
          //     <View
          //       style={{ width: '100%', height: "100%", justifyContent: 'center', alignItems: "flex-end" }}
          //       activeOpacity={0.9}
          //     >
          //       <AbstractIconButton icon={() => <CartSvg />} badge badgeCount={100} />
          //     </View>
          //   )}
          middleChild={() => (<View
            style={{ width: '100%', height: "100%", justifyContent: 'center', alignItems: "center" }}
          >
            <Text style={styles.textNine}>My Shopping Cart</Text>
          </View>)}
        />
      </View>

      <View style={{ width: "90%", alignSelf: 'center', flex: 2 }}>
        {loading ?
          <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }} >
            <ActivityIndicator size={"large"} color={Colors.primaryBlue} />
          </View> :
          <View>
            <FlatList
              data={cart?.items}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => {
                return <CartItem item={item} cartData={cart} />
              }}
              ListEmptyComponent={() => {
                return (
                  <View style={{ width: '100%', height: 200, justifyContent: "flex-end", alignItems: "center" }}>
                    <CartFillSvg size={80} />
                  </View>
                )
              }}
            />
            <View style={{ height: 50 }} />
          </View>
        }

      </View>

      <View style={{ width: "90%", alignSelf: 'center', flex: 1 }}>
        <View style={{ flex: 1, paddingTop: 5 }}>
          <View style={{ width: "100%", height: '100%', backgroundColor: Colors.primaryGray, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} >
            <View style={{ width: '90%', alignSelf: "center" }} >

              <View>


                {placeholderLoading ? <Placeholder width={320} /> :
                  <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }} >
                    <Text style={styles.textOne}>Items</Text>
                    <Text style={[styles.textOne, { fontSize: 16 }]}>{cart?.items?.length}</Text>
                  </View>
                }

                {placeholderLoading ? <Placeholder width={320} /> :
                  <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }} >
                    <Text style={styles.textOne}>Shipping Cost</Text>
                    <Text style={[styles.textOne, { fontSize: 16 }]}>{`$${SHIPPING_COST}`}</Text>
                  </View>
                }


                {placeholderLoading ? <Placeholder width={320} /> :
                  <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }} >
                    <Text style={styles.textOne}>Discount</Text>
                    <Text style={[styles.textOne, { color: "#FF6161", fontSize: 16 }]}>{`-${DISCOUNT}%`}</Text>
                  </View>
                }


                {placeholderLoading ? <Placeholder width={320} /> :
                  <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: "#9A9A9A", paddingTop: 5 }} >
                    <Text style={[styles.textOne, { fontFamily: Fonts.bold, fontSize: 18 }]}>Sub Total</Text>
                    <Text style={[styles.textOne, { fontFamily: Fonts.bold, fontSize: 18 }]}><Text style={styles.textOne}>{`$${discountedPrice} `}</Text>{` $${totalPrice}`}</Text>
                  </View>
                }

              </View>


            </View>
          </View>

        </View>
        <View style={{ height: 80 }} />

        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: Colors.primaryWhite, paddingBottom: 15 }}>
          <View style={{ width: '100%', alignSelf: 'center', marginTop: 10, marginBottom: 10 }}>
            <AbstractButton
              disabled={cart?.items.length == 0 ? true : false}
              txtColor={Colors.primaryWhite}
              loaderColor={Colors.primaryWhite}
              label={"Check Out"}
              onPress={onPressCheckout}
            />
          </View>
        </View>

      </View>

    </View>
  )
}

export default CartScreen


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.primaryBackground
  },
  textOne: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.primaryBlue
  },
  textNine: {
    fontFamily: Fonts.bold,
    fontSize: 19,
    color: Colors.primaryBlue
  },
})