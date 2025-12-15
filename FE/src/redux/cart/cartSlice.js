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

// Add Item in Cart
export const fetchAddCardItem = createAsyncThunk(
  'cart/fetchAddCardItem',
  async (data) => {
    const response = await instance.post("/cart/create-item", data)


    return response.data
  }
)

// Update Item in Cart
export const fetchUpdateCardItem = createAsyncThunk(
  'cart/fetchUpdateCardItem',
  async ({ id, data }) => {
    await instance.put(`/cart/update/${id}`, data)


    return {
      id,
      ...data
    }
  }
)

// Remove Item in Cart
export const fetchRemoveCardItem = createAsyncThunk(
  'cart/fetchRemoveCardItem',
  async (id) => {
    await instance.delete(`/cart/delete/${id}`)


    return id
  }
)


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      console.log(action.payload)
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.cart = action.payload
    })

    builder.addCase(fetchAddCardItem.fulfilled, (state, action) => {
      const product = action.payload
      const index = state.cart.cart_item.findIndex((item) => item.id === product.id)
      if (index < 0)
        state.cart.cart_item.unshift(product)
      else
        state.cart.cart_item[index] = product
      toast.success('Cập nhật giỏ hàng thành công')
    })

    builder.addCase(fetchUpdateCardItem.fulfilled, (state, action) => {
      const product = action.payload
      const index = state.cart.cart_item.findIndex((item) => item.id === product.id)
      state.cart.cart_item[index].quantity = product.quantity
    })

    builder.addCase(fetchRemoveCardItem.fulfilled, (state, action) => {
      state.cart.cart_item = state.cart.cart_item.filter(item => item.id !== action.payload)
    })
  }
})

// Action creators are generated for each case reducer function
export const { addItem } = cartSlice.actions

export default cartSlice.reducer