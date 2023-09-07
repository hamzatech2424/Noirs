import axios from "axios";
import { setCategories } from "../Store/Slices/categorySlice";
import {store} from "../Store/index";
import { BASE_URL } from "../proxy";
import { useSelector } from "react-redux";

const NETWORK_ERROR = "Internet Error"

class CategoryController {

    static fetchCategories = () => {
        return new Promise((resolve, reject) => {
            axios
                .get(`${BASE_URL}/user/categories/main-menu-categories`)
                .then(response => {
                    // console.log(response.data, 'createAccountResponse')
                    if (response.data.success) {
                        resolve(response.data.data)
                    } else {
                        reject(response.data.error.message);
                    }
                })
                .catch(err => {
                    console.log(err, "Error in fetchCategoriesApiCall");
                    reject(NETWORK_ERROR);
                });
        })
    }

    static handleCategories = (_callback = ()=>false) => {
        CategoryController.fetchCategories()
            .then((result) => {
                if(result.length > 0){
                    store.dispatch(setCategories(result))
                    _callback(true)
                }
                else{
                    store.dispatch(setCategories([]))
                    _callback(true)
                }
            })
            .catch((error) => {
             console.log(error,'Error in fetchCategories')
             _callback(true)
            })
    }


    static fetchBanner = () => {
        return new Promise((resolve, reject) => {
            axios
                .get(`${BASE_URL}/user/banner/get-all-banner`)
                .then(response => {
                    // console.log(response.data, 'fetchBanner')
                    if (response.data.success) {
                        resolve(response.data.data)
                    } else {
                        reject(response.data.error.message);
                    }
                })
                .catch(err => {
                    console.log(err, "Error in fetchBannerApiCall");
                    reject(NETWORK_ERROR);
                });
        })
    }

}

export default CategoryController

export const useCategories = () => {
    return useSelector((state) => state.category.categories)
}