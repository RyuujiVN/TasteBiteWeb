import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { instance } from '~/api/index'

const initialState = {
  listAddress: [],
  listProvince: [],
  listWard: [],
}

// Get All
export const fetchGetAllAddress = createAsyncThunk(
  'address/fetchGetAllAddress',
  async () => {
    const response = await instance.get('/address')

    return response.data
  }
)

// Get Province
export const fetchGetProvince = createAsyncThunk(
  'address/fetchGetProvince',
  async () => {
    const response = await axios.get('https://provinces.open-api.vn/api/v2')

    return response.data
  }
)

// Get Ward
export const fetchGetWard = createAsyncThunk(
  'address/fetchGetWard',
  async (provinceId) => {
    const response = await axios.get(`https://provinces.open-api.vn/api/v2/w?province=${provinceId}`)

    console.log(response)

    return response.data
  }
)

// Add
export const fetchAddAddress = createAsyncThunk(
  'address/fetchAddAddress',
  async (data) => {
    const response = await instance.post('/address/create', data)
    return response.data
  }
)

// Update
export const fetchUpdateAddress = createAsyncThunk(
  'address/fetchUpdateAddress',
  async ({ id, data }) => {
    const response = await instance.put(`/address/update/${id}`, data)

    return response.data
  }
)

// Delete
export const fectchDeleteAddress = createAsyncThunk(
  'address/fectchDeleteAddress',
  async (id, { dispatch }) => {
    const response = await instance.delete(`/address/delete/${id}`)
    dispatch(deleteAddress(id))
    return response.data
  }
)

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    deleteAddress: (state, action) => {
      state.listAddress = state.listAddress.filter(item => item.id != action.payload)
    },

    resetWard: (state, action) => {
      state.listWard = []
    }
  },

  extraReducers: (builder) => {

    builder.addCase(fetchGetAllAddress.fulfilled, (state, action) => {
      state.listAddress = action.payload
    })

    builder.addCase(fetchGetProvince.fulfilled, (state, action) => {
      state.listProvince = action.payload
    })

    builder.addCase(fetchGetWard.fulfilled, (state, action) => {
      state.listWard = action.payload
    })

    builder.addCase(fetchAddAddress.fulfilled, (state, action) => {
      state.listAddress.push(action.payload)
      toast.success('Thêm thành công')
    })

    builder.addCase(fetchUpdateAddress.fulfilled, (state, action) => {
      const updatedAdrress = action.payload
      const index = state.listAddress.findIndex(item => item.id == updatedAdrress.id)

      state.listAddress[index] = updatedAdrress
      toast.success("Chỉnh sửa thành công!")
    })

    builder.addCase(fectchDeleteAddress.fulfilled, (state, action) => {
      toast.success(action.payload.message)
    })
  }
})

// Action creators are generated for each case reducer function
export const { deleteAddress, resetWard } = addressSlice.actions

export default addressSlice.reducer