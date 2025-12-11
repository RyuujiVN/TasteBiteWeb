import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { instance } from '~/api/index'

const initialState = {
  listProduct: [],
  pagination: {},
  productDetail: null,
}

// Get List For Admin
export const fetchGetListProduct = createAsyncThunk(
  'product/fetchGetListProduct',
  async (params) => {
    const response = await instance.get('/product', {
      params: params
    })

    return response.data
  }
)

// Get List For Client
export const fetchGetListProductClient = createAsyncThunk(
  'product/fetchGetListProductClient',
  async (params) => {
    const response = await instance.get('/product/filter', {
      params: params
    })

    return response.data
  }
)

// Get Detail
export const fetchGetDetailProduct = createAsyncThunk(
  'product/fetchGetDetailProduct',
  async (id) => {
    const response = await instance.get(`/product/${id}`)

    return response.data
  }
)

// Upload Image
export const fetchUploadImage = createAsyncThunk(
  'product/fetchGetListProduct',
  async (params) => {
    const response = await instance.get('/product', {
      params: params
    })

    return response.data
  }
)

// Add
export const fetchAddProduct = createAsyncThunk(
  'product/fetchAddProduct',
  async (data) => {
    const response = await instance.post('/product/create', data)

    return response.data
  }
)

// Update
export const fetchUpdateProduct = createAsyncThunk(
  'product/fetchUpdateProduct',
  async ({ id, data }) => {
    const response = await instance.put(`/product/update/${id}`, data)


    return response.data
  }
)

// Update Multi
export const fetchUpdateMultiProduct = createAsyncThunk(
  'product/fetchUpdateProduct',
  async (data) => {
    const response = await instance.put('/product/update-multi', data)


    return response.data
  }
)

// Delete
export const fetchDeleteProduct = createAsyncThunk(
  'product/fetchDeleteProduct',
  async (id, { dispatch }) => {
    const response = await instance.delete(`/product/delete/${id}`)
    dispatch(deleteProduct(id))
    return response.data
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    deleteProduct: (state, action) => {
      state.listProduct = state.listProduct.filter(item => item.id != action.payload)
      state.pagination.itemCount--
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchGetListProduct.fulfilled, (state, action) => {
      state.listProduct = action.payload.items
      state.pagination = action.payload.meta
    })

    builder.addCase(fetchGetListProductClient.fulfilled, (state, action) => {
      state.listProduct = action.payload
    })


    builder.addCase(fetchGetDetailProduct.fulfilled, (state, action) => {
      state.productDetail = action.payload
    })

    builder.addCase(fetchAddProduct.fulfilled, (state, action) => {
      state.listProduct.push(action.payload)
      state.pagination.itemCount++
      toast.success('Thêm sản phẩm thành công')
    })

    builder.addCase(fetchUpdateProduct.fulfilled, (state, action) => {
      const updatedProduct = action.payload
      const index = state.listProduct.findIndex(item => item.id == updatedProduct.id)

      state.listProduct[index] = updatedProduct
      toast.success("Chỉnh sửa thành công!")
    })

    builder.addCase(fetchDeleteProduct.fulfilled, (state, action) => {
      toast.success(action.payload.message)
    })
  }
})

// Action creators are generated for each case reducer function
export const { deleteProduct } = productSlice.actions

export default productSlice.reducer