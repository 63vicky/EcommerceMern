import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { isLoading: false, addressList: [] };

export const addNewAddress = createAsyncThunk(
  '/addresses/addNewAddress',
  async (formData) => {
    const response = await axios.post(
      'https://ecommercemern-pzo0.onrender.com/api/shop/address/add',
      formData
    );

    return response.data;
  }
);

export const fetchAllAddresses = createAsyncThunk(
  '/addresses/fetchAllAddresses',
  async (userId) => {
    const response = await axios.get(
      `https://ecommercemern-pzo0.onrender.com/api/shop/address/get/${userId}`
    );

    return response.data;
  }
);

export const editaAddress = createAsyncThunk(
  '/addresses/editaAddress',
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `https://ecommercemern-pzo0.onrender.com/api/shop/address/update/${userId}/${addressId}`,
      formData
    );

    return response.data;
  }
);
export const deleteAddress = createAsyncThunk(
  '/addresses/deleteAddress',
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `https://ecommercemern-pzo0.onrender.com/api/shop/address/delete/${userId}/${addressId}`
    );

    return response.data;
  }
);

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = true;
      });
  },
});

export default addressSlice.reducer;
