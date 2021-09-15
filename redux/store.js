import { configureStore } from '@reduxjs/toolkit'
import drawerSlice from './slices/drawer'

export const store = configureStore({
  reducer: {
      drawer:drawerSlice
  },
})