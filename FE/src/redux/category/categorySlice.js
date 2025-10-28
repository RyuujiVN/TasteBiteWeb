import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { instance } from '~/api/adminApi'

const initialState = {
  listCategory: [],
  pagination: {}
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
    const response = await instance.patch(`/category/edit/${id}`, data)
    return response.data
  }
)

// Delete
export const fectchDeleteCategory = createAsyncThunk(
  'categoryfectchDeleteCategory',
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
      state.listCategory = state.listCategory.filter(item => item._id != action.payload)
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchGetListCategory.fulfilled, (state, action) => {
      state.listCategory = action.payload.items
      state.pagination = action.payload.meta
    }),

      builder.addCase(fetchAddCategory.fulfilled, (state, action) => {
        state.listCategory.push(action.payload)
        toast.success('Thêm loại thành công')
      }),

      builder.addCase(fetchUpdateCategory.fulfilled, (state, action) => {
        const updatedCategory = action.payload
        const index = state.listCategory.findIndex(item => item._id == updatedCategory._id)

        state.listCategory[index] = updatedCategory
        toast.success("Chỉnh sửa thành công!")
      })
  }
})

// Action creators are generated for each case reducer function
export const { deleteCategory } = categorySlice.actions

export default categorySlice.reducer