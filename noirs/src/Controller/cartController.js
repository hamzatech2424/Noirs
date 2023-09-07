import axios from "axios";
import { BASE_URL } from "../proxy";
import AuthController from "../Controller/authController";
import { store } from "../Store";
import { useSelector } from "react-redux";
import { setCart } from "../Store/Slices/cartSlice";

const NETWORK_ERROR = "Internet Error"

class CartController {

    static addProductToCart = (productObject) => {
        return new Promise((resolve, reject) => {
            const user = AuthController.currentUser()
            axios
                .post(`${BASE_URL}/user/cart/add-to-cart/${user._id}`, productObject)
                .then(response => {
                    // console.log(response.data, 'createAccountResponse')
                    if (response.data.success) {
                        resolve(response.data.data)
                    } else {
                        reject(response.data.error.message);
                    }
                })
                .catch(err => {
                    console.log(err, "Error in addProductToCartApiCall");
                    reject(NETWORK_ERROR);
                });
        })
    }

    static fetchCart = () => {
        return new Promise((resolve, reject) => {
            const user = AuthController.currentUser()
            axios
                .get(`${BASE_URL}/user/cart/get-user-cart/${user._id}`)
                .then(response => {
                    // console.log(response.data, 'createAccountResponse')
                    if (response.data.success) {
                        resolve(response.data.data)
                    } else {
                        reject(response.data.error.message);
                    }
                })
                .catch(err => {
                    console.log(err, "Error in fetchCartCall");
                    reject(NETWORK_ERROR);
                });
        })
    }

    static handleFetchCart = (_callback = () => false) => {
        CartController.fetchCart()
            .then((result) => {
                // console.log(result, 'cart Result ====>')
                store.dispatch(setCart(result))
                _callback(true)
            })
            .catch((error) => {
                console.log(error, 'error in fetchCart')
                _callback(true)
            })
    }


    static deleteCartItem = (cartId, cartItemId) => {
        return new Promise((resolve, reject) => {
            const user = AuthController.currentUser()
            axios
                .delete(`${BASE_URL}/user/cart/delete-item/${cartId}/${cartItemId}`)
                .then(response => {
                    // console.log(response.data, 'createAccountResponse')
                    if (response.data.success) {
                        resolve(response.data.data)
                    } else {
                        reject(response.data.error.message);
                    }
                })
                .catch(err => {
                    console.log(err, "Error in deleteCartItemApiCall");
                    reject(NETWORK_ERROR);
                });
        })
    }


    static updateCartItem = (bodyObject) => {
        return new Promise((resolve, reject) => {
            const user = AuthController.currentUser()
            // console.log(user._id,'useruseruseruser',bodyObject)
            axios
                .patch(`${BASE_URL}/user/cart/update-cart-item/${user._id}`,bodyObject)
                .then(response => {
                    console.log(response.data.data, 'updateCartItemResponse')
                    if (response.data.success) {
                        resolve(response.data.data)
                    } else {
                        reject(response.data.error.message);
                    }
                })
                .catch(err => {
                    console.log(err, "Error in updateCartItemApiCall");
                    reject(NETWORK_ERROR);
                });
        })
    }

    

}

export default CartController


export const useCart = () => {
    return useSelector((state) => state.cart.cart)
}


