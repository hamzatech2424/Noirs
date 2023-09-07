import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: [],
}

export const CategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCategories } = CategorySlice.actions

export default CategorySlice.reducer