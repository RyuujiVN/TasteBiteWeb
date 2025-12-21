import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { instance } from '~/api'

const initialState = {
  listOrder: [],
  pagination: {},
  orderDetail: null
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

// Get Detail
export const fetchGetDetailOrder = createAsyncThunk(
  'product/fetchGetDetailOrder',
  async (id) => {
    const response = await instance.get(`/order/${id}`)

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

// Update Status Order
export const fetchUpdateOrderStatus = createAsyncThunk(
  'cart/fetchUpdateOrderStatus',
  async ({ id, data }) => {
    await instance.patch(`/order/update/status/${id}`, data)


    return {
      id,
      data
    }
  }
)

// Update Payment Status Order
export const fetchUpdatePaymentStatus = createAsyncThunk(
  'cart/fetchUpdatePaymentStatus',
  async ({ id, data }) => {
    await instance.patch(`/order/update/payment-status/${id}`, data)


    return {
      id,
      data
    }
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

    builder.addCase(fetchGetDetailOrder.fulfilled, (state, action) => {
      state.orderDetail = action.payload
    })

    builder.addCase(fetchUpdateOrderStatus.fulfilled, (state, action) => {
      const updatedOrder = action.payload
      const index = state.listOrder.findIndex(item => item.id == updatedOrder.id)

      state.listOrder[index].status = updatedOrder.data.status
      toast.success("Cập nhật trạng thái đơn hàng thành công!")
    })

    builder.addCase(fetchUpdatePaymentStatus.fulfilled, (state, action) => {
      const updatedOrder = action.payload
      const index = state.listOrder.findIndex(item => item.id == updatedOrder.id)

      state.listOrder[index].payment_status = updatedOrder.data.payment_status
      toast.success("Cập nhật trạng thái thanh toán thành công!")
    })
  }
})

// Action creators are generated for each case reducer function
export const { addItem } = orderSlice.actions

export default orderSlice.reducer