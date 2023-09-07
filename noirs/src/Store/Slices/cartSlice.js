import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: {},
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload
    },
    setCartItem: (state, action) => {
      const findIndexOfItem = state.cart.items.findIndex((it)=>it._id == action.payload._id)
      if(findIndexOfItem >= 0){
        state.cart.items[findIndexOfItem] = action.payload
      }
      else{
        console.log("Product not found from reducer line 20")
      }
    },
    removeCartItem: (state, action) => {
      let newArray = state.cart.items.filter((item) => item._id != action.payload._id)
      state.cart = { ...state.cart, items: newArray }
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCart,setCartItem,removeCartItem } = cartSlice.actions

export default cartSlice.reducer