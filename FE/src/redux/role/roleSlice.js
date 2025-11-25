import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { instance } from '~/api/adminApi'

const initialState = {
  listRole: [],
  pagination: {},
  roleDetail: null,
}

// Get All
export const fetchGetAllRole = createAsyncThunk(
  'role/fetchGetAllRole',
  async () => {
    const response = await instance.get('/role/get-all')

    return response.data
  }
)

// Get List
export const fetchGetListRole = createAsyncThunk(
  'role/fetchGetListRole',
  async (params) => {
    const response = await instance.get('/role', {
      params: params
    })

    return response.data
  }
)

// Get Detail
export const fetchGetDetailRole = createAsyncThunk(
  'role/fetchGetDetailRole',
  async (id) => {
    const response = await instance.get(`/role/${id}`)

    return response.data
  }
)

// Add
export const fetchAddRole = createAsyncThunk(
  'role/fetchAddRole',
  async (data) => {
    const response = await instance.post('/role/create', data)

    return response.data
  }
)

// Update Permission for role
export const fetchUpdatePermissionRole = createAsyncThunk(
  'role/fetchUpdatePermissionRole',
  async (data) => {
    const response = await instance.put("/role/update-role", data)


    return response.data
  }
)

// Update
export const fetchUpdateRole = createAsyncThunk(
  'role/fetchUpdateRole',
  async ({ id, data }) => {
    const response = await instance.put(`/role/update/${id}`, data)


    return response.data
  }
)

// Delete
export const fetchDeleteRole = createAsyncThunk(
  'role/fetchDeleteRole',
  async (id, { dispatch }) => {
    const response = await instance.delete(`/role/delete/${id}`)
    dispatch(deleteRole(id))
    return response.data
  }
)

export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    deleteRole: (state, action) => {
      state.listRole = state.listRole.filter(item => item.id != action.payload)
      state.pagination.itemCount--
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchGetListRole.fulfilled, (state, action) => {
      state.listRole = action.payload.items
      state.pagination = action.payload.meta
    })

    builder.addCase(fetchGetAllRole.fulfilled, (state, action) => {
      state.listRole = action.payload
    })

    builder.addCase(fetchGetDetailRole.fulfilled, (state, action) => {
      state.roleDetail = action.payload
    })

    builder.addCase(fetchAddRole.fulfilled, (state, action) => {
      state.listRole.push(action.payload)
      state.pagination.itemCount++
      toast.success('Thêm role thành công')
    })

    builder.addCase(fetchUpdateRole.fulfilled, (state, action) => {
      const updatedRole = action.payload
      const index = state.listRole.findIndex(item => item.id == updatedRole.id)

      state.listRole[index] = updatedRole
      toast.success("Chỉnh sửa thành công!")
    })

    builder.addCase(fetchDeleteRole.fulfilled, (state, action) => {
      toast.success(action.payload.message)
    })
  }
})

// Action creators are generated for each case reducer function
export const { deleteRole } = roleSlice.actions

export default roleSlice.reducer