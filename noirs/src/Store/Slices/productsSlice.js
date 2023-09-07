import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allProducts: [],
  filterMeta: {},
  wishListProducts: []
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload
    },
    setFilterMeta: (state, action) => {
      state.filterMeta = action.payload
    },
    setWishList: (state, action) => {
      state.wishListProducts = action.payload
    },
    addProductToWishList: (state, action) => {
      state.wishListProducts.push(action.payload)
    },
    removeProductFromWishList: (state, action) => {
      const newArray = state.wishListProducts.filter((item)=>item._id != action.payload._id)
      state.wishListProducts = newArray
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAllProducts, setFilterMeta, setWishList,addProductToWishList, removeProductFromWishList } = productSlice.actions

export default productSlice.reducer