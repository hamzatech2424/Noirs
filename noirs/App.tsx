import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainNavigation from './src/Navigation/mainNavigation'
import { Provider } from 'react-redux'
import { store } from './src/Store'

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  )
}

export default App
