import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { instance } from '~/api/index'

const initialState = {
  listCategory: [],
  pagination: {},
}

// Get List
export const fetchGetListCategory = createAsyncThunk(
  'category/fetchGetListCategory',
  async (params) => {
    const response = await instance.get('/category', {
      params: params
    })

    return response.data
  }
)

// Get All
export const fetchGetAllCategory = createAsyncThunk(
  'category/fetchGetAllCategory',
  async (params) => {
    const response = await instance.get('/category/get-all', {
      params: params
    })

    return response.data
  }
)

// Add
export const fetchAddCategory = createAsyncThunk(
  'category/fetchAddCategory',
  async (data) => {
    const response = await instance.post('/category/create', data)
    return response.data
  }
)

// Update
export const fetchUpdateCategory = createAsyncThunk(
  'category/fetchUpdateCategory',
  async ({ id, data }) => {
    const response = await instance.put(`/category/update/${id}`, data)

    return response.data
  }
)

// Delete
export const fectchDeleteCategory = createAsyncThunk(
  'category/fectchDeleteCategory',
  async (id, { dispatch }) => {
    const response = await instance.delete(`/category/delete/${id}`)
    dispatch(deleteCategory(id))
    return response.data
  }
)

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    deleteCategory: (state, action) => {
      state.listCategory = state.listCategory.filter(item => item.id != action.payload)
      state.pagination.itemCount--
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchGetListCategory.fulfilled, (state, action) => {
      state.listCategory = action.payload.items
      state.pagination = action.payload.meta
    })

    builder.addCase(fetchGetAllCategory.fulfilled, (state, action) => {
      state.listCategory = action.payload
    })

    builder.addCase(fetchAddCategory.fulfilled, (state, action) => {
      state.listCategory.push(action.payload)
      state.pagination.itemCount++
      toast.success('Thêm loại thành công')
    })

    builder.addCase(fetchUpdateCategory.fulfilled, (state, action) => {
      const updatedCategory = action.payload
      const index = state.listCategory.findIndex(item => item.id == updatedCategory.id)

      state.listCategory[index] = updatedCategory
      toast.success("Chỉnh sửa thành công!")
    })

    builder.addCase(fectchDeleteCategory.fulfilled, (state, action) => {
      toast.success(action.payload.message)
    })
  }
})

// Action creators are generated for each case reducer function
export const { deleteCategory } = categorySlice.actions

export default categorySlice.reducer