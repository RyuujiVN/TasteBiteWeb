import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { instance } from '~/api'

const initialState = {
  currentUser: null,
  listUser: [],
  pagination: null,
}

// Get List
export const fetchGetListUser = createAsyncThunk(
  'user/fetchGetListUser',
  async (params) => {
    const response = await instance.get('/user', {
      params: params
    })

    return response.data
  }
)

// Current user
export const fetchGetProfile = createAsyncThunk(
  'user/fetchGetProfile',
  async () => {
    const response = await instance.get('/user/profile')

    return response.data
  }
)

// Update status
export const fetchUpdateUserStatus = createAsyncThunk(
  'user/fetchUpdateUserStatus',
  async ({ id, data }) => {
    const response = await instance.patch(`/user/update/${id}`, data)

    return response.data
  }
)

// Update profile
export const fetchUpdateProfile = createAsyncThunk(
  'user/fetchUpdateProfile',
  async (data) => {
    const response = await instance.patch(`/user/update`, data)

    return response.data
  }
)

// Delete
export const fetchDeleteUser = createAsyncThunk(
  'product/fetchDeleteUser',
  async (id, { dispatch }) => {
    const response = await instance.delete(`/user/delete/${id}`)
    dispatch(deleteUser(id))
    return response.data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("userInfo", JSON.stringify(action.payload.userInfo));
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);

      state.currentUser = action.payload.userInfo;

    },

    deleteUser: (state, action) => {
      state.listUser = state.listUser.filter(item => item.id != action.payload)
      state.pagination.itemCount--
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchGetListUser.fulfilled, (state, action) => {
      state.listUser = action.payload.items
      state.pagination = action.payload.meta
    })


    builder.addCase(fetchGetProfile.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })

    builder.addCase(fetchUpdateUserStatus.fulfilled, (state, action) => {
      const updatedUser = action.payload
      const index = state.listUser.findIndex(item => item.id == updatedUser.id)

      state.listUser[index] = updatedUser
      toast.success("Cập nhật trạng thái thành công!")
    })

    builder.addCase(fetchUpdateProfile.fulfilled, (state, action) => {
      state.currentUser = action.payload
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
      toast.success("Cập nhật thông tin thành công!");
    })

    builder.addCase(fetchDeleteUser.fulfilled, (state, action) => {
      toast.success(action.payload.message)
    })
  }
})

// Action creators are generated for each case reducer function
export const { login, deleteUser } = userSlice.actions

export default userSlice.reducer