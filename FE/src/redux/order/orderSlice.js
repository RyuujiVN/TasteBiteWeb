import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { instance } from '~/api'

const initialState = {
  cart: null
}

// Create Order
export const fetchCreateOrder = createAsyncThunk(
  'cart/fetchCreateOrder',
  async (data) => {
    const response = await instance.post("/order/create", data)


    return response.data
  }
)


export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addItem: (state, action) => {
      console.log(action.payload)
    }
  },

  extraReducers: (builder) => {
    // builder.addCase(fetchCart.fulfilled, (state, action) => {
    //   state.cart = action.payload
    // })
  }
})

// Action creators are generated for each case reducer function
export const { addItem } = orderSlice.actions

export default orderSlice.reducer