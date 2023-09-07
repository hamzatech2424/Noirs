import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  darkMode: false,
}

export const themeSlice = createSlice({
  name: 'themes',
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDarkMode } = themeSlice.actions

export default themeSlice.reducer