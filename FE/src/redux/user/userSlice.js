import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { instance } from '~/api'

const initialState = {
  currentUser: null
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

    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchGetProfile.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })

    builder.addCase(fetchUpdateProfile.fulfilled, (state, action) => {
      state.currentUser = action.payload
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
      toast.success("Cập nhật thông tin thành công!");
    })
  }
})

// Action creators are generated for each case reducer function
export const { login } = userSlice.actions

export default userSlice.reducer