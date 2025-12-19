import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './category/categorySlice'
import productReducer from './product/productSlice'
import roleReducer from './role/roleSlice'
import adminReducer from './admin/adminSlice'
import userReducer from './user/userSlice'
import addressReducer from './address/addressSlice'
import cartReducer from './cart/cartSlice'
import orderReducer from './order/orderSlice'

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    role: roleReducer,
    admin: adminReducer,
    user: userReducer,
    address: addressReducer,
    cart: cartReducer,
    order: orderReducer,
  },
})