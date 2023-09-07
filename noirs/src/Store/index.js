import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import themeSlice from './Slices/themeSlice'
import authSlice from './Slices/authSlice'
import CategorySlice from './Slices/categorySlice'
import ProductsSlice from './Slices/productsSlice'
import CartSlice from './Slices/cartSlice'

export const store = configureStore({
    reducer: {
        themes:themeSlice,
        auth:authSlice,
        category:CategorySlice,
        products:ProductsSlice,
        cart:CartSlice
    },
  })