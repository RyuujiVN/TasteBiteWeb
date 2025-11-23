import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { instance } from '~/api/adminApi'

const initialState = {
  listAdmin: [],
  pagination: {},
}

// Get List
export const fetchGetListAdmin = createAsyncThunk(
  'admin/fetchGetListAdmin',
  async (params) => {
    const response = await instance.get('/admin', {
      params: params
    })

    return response.data
  }
)

// Get All
export const fetchGetAllAdmin = createAsyncThunk(
  'admin/fetchGetAllAdmin',
  async (params) => {
    const response = await instance.get('/admin/get-all', {
      params: params
    })

    return response.data
  }
)

// Add
export const fetchAddAdmin = createAsyncThunk(
  'admin/fetchAddAdmin',
  async (data) => {
    const response = await instance.post('/admin/create', data)
    return response.data
  }
)

// Update
export const fetchUpdateAdmin = createAsyncThunk(
  'admin/fetchUpdateAdmin',
  async ({ id, data }) => {
    const response = await instance.put(`/admin/update/${id}`, data)

    return response.data
  }
)

// Delete
export const fectchDeleteAdmin = createAsyncThunk(
  'admin/fectchDeleteAdmin',
  async (id, { dispatch }) => {
    const response = await instance.delete(`/admin/delete/${id}`)
    dispatch(deleteAdmin(id))
    return response.data
  }
)

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    deleteAdmin: (state, action) => {
      state.listAdmin = state.listAdmin.filter(item => item.id != action.payload)
      state.pagination.itemCount--
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchGetListAdmin.fulfilled, (state, action) => {
      state.listAdmin = action.payload.items
      state.pagination = action.payload.meta
    })

    builder.addCase(fetchAddAdmin.fulfilled, (state, action) => {
      state.listAdmin.push(action.payload)
      state.pagination.itemCount++
      toast.success('Thêm admin thành công')
    })

    builder.addCase(fetchUpdateAdmin.fulfilled, (state, action) => {
      const updatedAdmin = action.payload
      const index = state.listAdmin.findIndex(item => item.id == updatedAdmin.id)

      state.listAdmin[index] = updatedAdmin
      toast.success("Chỉnh sửa thành công!")
    })

    builder.addCase(fectchDeleteAdmin.fulfilled, (state, action) => {
      toast.success(action.payload.message)
    })
  }
})

// Action creators are generated for each case reducer function
export const { deleteAdmin } = adminSlice.actions

export default adminSlice.reducer