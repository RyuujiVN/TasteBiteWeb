import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from '~/api'

const initialState = {
  listOrder: [],
  pagination: {}
}

// Get List
export const fetchGetListOrderAdmin = createAsyncThunk(
  'category/fetchGetListOrderAdmin',
  async (params) => {
    const response = await instance.get('/order', {
      params: params
    })

    return response.data
  }
)

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
    builder.addCase(fetchGetListOrderAdmin.fulfilled, (state, action) => {
      state.listOrder = action.payload.items
      state.pagination = action.payload.meta
    })

    builder.addCase(fetchCreateOrder.fulfilled, (state, action) => {
      location.href = '/order-success'
    })
  }
})

// Action creators are generated for each case reducer function
export const { addItem } = orderSlice.actions

export default orderSlice.reducer