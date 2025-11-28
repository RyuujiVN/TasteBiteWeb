import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { instance } from '~/api'

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('userInfo') | {})
}

// Current user
export const fetchGetProfile = createAsyncThunk(
  'user/fetchGetProfile',
  async () => {
    const response = await instance.get('/user/profile')

    return response.data
  }
)

// Update profile
export const fetchUpdateProfile = createAsyncThunk(
  'user/fetchUpdateProfile',
  async (data) => {
    const response = await instance.patch(`/user/update`, data)
    console.log(response)


    return response.data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder.addCase(fetchGetProfile.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })

    builder.addCase(fetchUpdateProfile.fulfilled, (state, action) => {
      state.currentUser = action.payload
      localStorage.setItem('userInfo', action.payload)
      toast.success("Cập nhật thông tin thành công!");
    })
  }
})

// Action creators are generated for each case reducer function
export const { deleteuser } = userSlice.actions

export default userSlice.reducer