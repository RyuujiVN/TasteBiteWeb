import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './category/categorySlice'
import productReducer from './product/productSlice'
import roleReducer from './role/roleSlice'
import adminReducer from './admin/adminSlice'

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    role: roleReducer,
    admin: adminReducer
  },
})