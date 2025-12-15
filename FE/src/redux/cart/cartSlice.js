import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { instance } from '~/api'

const initialState = {
  cart: null
}

// Get Cart
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async () => {
    const response = await instance.get("/user/cart")


    return response.data
  }
)


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.cart = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
export const { } = cartSlice.actions

export default cartSlice.reducer