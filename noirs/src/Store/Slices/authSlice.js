import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  onBoarding: true
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload
    },
    setOnboardingState: (state, action) => {
      state.onBoarding = action.payload
    },
    addProductIDToWishList: (state, action) => {
      state.user.wishList.push(action.payload)
    },
    removeProductIDToWishList: (state, action) => {
      let newArray = state.user.wishList.filter((it) => it != action.payload)
      state.user = {...state.user,wishList:newArray}
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserData, setOnboardingState, addProductIDToWishList, removeProductIDToWishList } = authSlice.actions

export default authSlice.reducer