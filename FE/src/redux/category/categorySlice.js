import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { API_ADMIN } from '~/api/adminApi'

const initialState = {
  currentCategory: []
}

// Get List
export const fetchGetListCategory = createAsyncThunk(
  'category/fetchGetListCategory',
  async (keyword) => {
    const response = await API_ADMIN.get('/category/list', {
      params: {
        keyword: keyword
      }
    })

    return response.data
  }
)

// Add
export const fetchAddCategory = createAsyncThunk(
  'category/fetchAddCategory',
  async (data) => {
    const response = await API_ADMIN.post('/category/create', data)
    return response.data
  }
)

// Update
export const fetchUpdateCategory = createAsyncThunk(
  'category/fetchUpdateCategory',
  async ({ id, data }) => {
    const response = await API_ADMIN.patch(`/category/edit/${id}`, data)
    return response.data
  }
)

// Delete
export const fectchDeleteCategory = createAsyncThunk(
  'categoryfectchDeleteCategory',
  async (id, { dispatch }) => {
    const response = await API_ADMIN.delete(`/category/delete/${id}`)
    dispatch(deleteCategory(id))
    return response.data
  }
)

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    deleteCategory: (state, action) => {
      state.currentCategory = state.currentCategory.filter(item => item._id != action.payload)
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchGetListCategory.fulfilled, (state, action) => {
      const categories = action.payload.map(item => {
        item.updatedBy = item.updatedBy?.slice(-1)[0]
        return item
      })
      state.currentCategory = categories
    }),

      builder.addCase(fetchAddCategory.fulfilled, (state, action) => {
        state.currentCategory.push(action.payload)
        toast.success('Thêm loại thành công')
      }),

      builder.addCase(fetchUpdateCategory.fulfilled, (state, action) => {
        const updatedCategory = action.payload
        const index = state.currentCategory.findIndex(item => item._id == updatedCategory._id)

        state.currentCategory[index] = updatedCategory
        toast.success("Chỉnh sửa thành công!")
      })
  }
})

// Action creators are generated for each case reducer function
export const { deleteCategory } = categorySlice.actions

export default categorySlice.reducer