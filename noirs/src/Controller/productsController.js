import axios from "axios";
import { setAllProducts, setWishList } from "../Store/Slices/productsSlice";
import { store } from "../Store/index";
import { BASE_URL } from "../proxy";
import { useSelector } from "react-redux";
import AuthController from "./authController";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NETWORK_ERROR = "Internet Error"

class ProductsController {

    static fetchAllProducts = () => {
        return new Promise((resolve, reject) => {
            axios
                .get(`${BASE_URL}/user/products/get-all-product`)
                .then(response => {
                    // console.log(response.data, 'createAccountResponse')
                    if (response.data.success) {
                        resolve(response.data.data)
                    } else {
                        reject(response.data.error.message);
                    }
                })
                .catch(err => {
                    console.log(err, "Error in fetchAllProductsApiCall");
                    reject(NETWORK_ERROR);
                });
        })
    }

    static handleAllProducts = (_callback = () => false) => {
        ProductsController.fetchAllProducts()
            .then((result) => {
                if (result.length > 0) {
                    store.dispatch(setAllProducts(result))
                    _callback(true)
                }
                else {
                    store.dispatch(setAllProducts([]))
                    _callback(true)
                }
            })
            .catch((error) => {
                console.log(error, 'Error in fetchAllProducts')
                _callback(true)
            })
    }

    static fetchSingleProduct = (productId) => {
        return new Promise((resolve, reject) => {
            axios
                .get(`${BASE_URL}/user/products/get-all-product/${productId}`)
                .then(response => {
                    // console.log(response.data, 'createAccountResponse')
                    if (response.data.success) {
                        resolve(response.data.data)
                    } else {
                        reject(response.data.error.message);
                    }
                })
                .catch(err => {
                    console.log(err, "Error in fetchSingleProductApiCall");
                    reject(NETWORK_ERROR);
                });
        })
    }

    static fetchSizeAndColorFromSubCategoryForFilters = (subCategoryId) => {
        // console.log(subCategoryId,'subCategoryId')
        return new Promise((resolve, reject) => {
            axios
                .get(`${BASE_URL}/user/categories/get-filters-meta/${subCategoryId}`)
                .then(response => {
                    // console.log(response.data, 'fetchSizeAndColorFromSubCategoryForFilters')
                    if (response.data.success) {
                        resolve(response.data.data)
                    } else {
                        reject(response.data.error.message);
                    }
                })
                .catch(err => {
                    console.log(err, "Error in fetchSizeAndColorFromSubCategoryApiCall");
                    reject(NETWORK_ERROR);
                });
        })
    }

    static fetchRandomProductsWithMainCategory = (mainCategoryId) => {
        return new Promise((resolve, reject) => {
            axios
                .get(`${BASE_URL}/user/products/get-random-products/${mainCategoryId}`)
                .then(response => {
                    // console.log(response.data, 'createAccountResponse')
                    if (response.data.success) {
                        resolve(response.data.data)
                    } else {
                        reject(response.data.error.message);
                    }
                })
                .catch(err => {
                    console.log(err, "Error in fetchRandomProductsWithMainCategoryApiCall");
                    reject(NETWORK_ERROR);
                });
        })
    }


    static handleFetchedRandomProductsWithMainCategory = (mainCategoryId, _callback = () => false) => {
        ProductsController.fetchRandomProductsWithMainCategory(mainCategoryId)
            .then((result) => {
                if (result.length > 0) {
                    store.dispatch(setAllProducts(result))
                    _callback(true)
                }
                else {
                    store.dispatch(setAllProducts([]))
                    _callback(true)
                }
            })
            .catch((error) => {
                console.log(error, 'Error in fetchRandomProductsWithMainCategory')
                _callback(true)
            })
    }


    static fetchRandomProductsWithCategory = (categoryId) => {
        return new Promise((resolve, reject) => {
            axios
                .get(`${BASE_URL}/user/products/get-by-category/${categoryId}`)
                .then(response => {
                    // console.log(response.data, 'createAccountResponse')
                    if (response.data.success) {
                        resolve(response.data.data)
                    } else {
                        reject(response.data.error.message);
                    }
                })
                .catch(err => {
                    console.log(err, "Error in fetchRandomProductsWithCategoryApiCall");
                    reject(NETWORK_ERROR);
                });
        })
    }


    static handleFetchedRandomProductsWithCategory = (categoryId, _callback = () => false) => {
        ProductsController.fetchRandomProductsWithCategory(categoryId)
            .then((result) => {
                if (result.length > 0) {
                    store.dispatch(setAllProducts(result))
                    _callback(true)
                }
                else {
                    store.dispatch(setAllProducts([]))
                    _callback(true)
                }
            })
            .catch((error) => {
                console.log(error, 'Error in handleFetchedRandomProductsWithCategory')
                _callback(true)
            })
    }


    static fetchRandomProductsWithSubCategory = (subCategoryId) => {
        return new Promise((resolve, reject) => {
            axios
                .get(`${BASE_URL}/user/products/get-by-subcategory/${subCategoryId}`)
                .then(response => {
                    // console.log(response.data, 'createAccountResponse')
                    if (response.data.success) {
                        resolve(response.data.data)
                    } else {
                        reject(response.data.error.message);
                    }
                })
                .catch(err => {
                    console.log(err, "Error in fetchRandomProductsWithSubCategoryApiCall");
                    reject(NETWORK_ERROR);
                });
        })
    }


    static handleFetchRandomProductsWithSubCategory = (subCategoryId, _callback = () => false) => {
        ProductsController.fetchRandomProductsWithSubCategory(subCategoryId)
            .then((result) => {
                if (result.length > 0) {
                    store.dispatch(setAllProducts(result))
                    _callback(true)
                }
                else {
                    store.dispatch(setAllProducts([]))
                    _callback(true)
                }
            })
            .catch((error) => {
                console.log(error, 'Error in handleFetchRandomProductsWithSubCategory')
                _callback(true)
            })
    }


    static checkAvailabilityOfProduct = (productId, variantId) => {
        return new Promise((resolve, reject) => {
            axios
                .get(`${BASE_URL}/user/products/check-availability/${productId}/${variantId}`)
                .then(response => {
                    // console.log(response.data, 'createAccountResponse')
                    if (response.data.success) {
                        resolve(response.data.data)
                    } else {
                        reject(response.data.error.message);
                    }
                })
                .catch(err => {
                    console.log(err, "Error in checkAvailabilityOfProductApiCall");
                    reject(NETWORK_ERROR);
                });
        })
    }

    static filterProducts = (prepareObj) => {
        return new Promise((resolve, reject) => {
            axios
                .post(`${BASE_URL}/user/products/filter`, prepareObj)
                .then(response => {
                    // console.log(response.data, 'createAccountResponse')
                    if (response.data.success) {
                        resolve(response.data.data)
                    } else {
                        reject(response.data.error.message);
                    }
                })
                .catch(err => {
                    console.log(err, "Error in filterProductsApiCall");
                    reject(NETWORK_ERROR);
                });
        })
    }


    static addProductToWishList = (productId) => {
        return new Promise((resolve, reject) => {
            const user = AuthController.currentUser()
            axios
                .patch(`${BASE_URL}/user/products/add-to-wishlist/${user._id}/${productId}`)
                .then(response => {
                    // console.log(response.data, 'createAccountResponse')
                    if (response.data.success) {
                        resolve(response.data.data)
                    } else {
                        reject(response.data.error.message);
                    }
                })
                .catch(err => {
                    console.log(err, "Error in addProductToWishListApiCall");
                    reject(NETWORK_ERROR);
                });
        })
    }


    static fetchAllWishlist = () => {
        return new Promise((resolve, reject) => {
            const user = AuthController.currentUser()
            axios
                .get(`${BASE_URL}/user/products/wishlist/${user._id}`)
                .then(response => {
                    // console.log(response.data, 'createAccountResponse')
                    if (response.data.success) {
                        resolve(response.data.data)
                    } else {
                        reject(response.data.error.message);
                    }
                })
                .catch(err => {
                    console.log(err, "Error in fetchAllWishlistApiCall");
                    reject(NETWORK_ERROR);
                });
        })
    }


    static handleWishList = (_callback = () => false) => {
        ProductsController.fetchAllWishlist()
            .then((result) => {
                if (result.length > 0) {
                    store.dispatch(setWishList(result))
                    _callback(true)
                }
                else {
                    store.dispatch(setWishList([]))
                    _callback(true)
                }
            })
            .catch((error) => {
                console.log(error, 'Error in fetchAllWishlist')
                _callback(true)
            })
    }

    static updatedUserForWishList = () => {
        let userData = store.getState().auth.user;
        AsyncStorage.setItem(AuthController.USER_DATA, JSON.stringify(userData))
            .then((user) => {
                console.log("User Saved in AsyncStorage")
            })
            .catch((error) => {
                console.log(error, 'Error in Saving user in AsyncStorage')
            })
    }





}

export default ProductsController

export const useAllProducts = () => {
    return useSelector((state) => state.products.allProducts)
}

export const useAllWishListProducts = () => {
    return useSelector((state) => state.products.wishListProducts)
}