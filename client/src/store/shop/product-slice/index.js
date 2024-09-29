import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  productList: [],
};

const shopProductSlice = createSlice({
  name: 'shoppingProducts',
  initialState,
  reducers: {},
  extraReducers: (buider) => {
    buider
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      });
  },
});

export const fetchAllFilteredProducts = createAsyncThunk(
  '/products/fetchAllProducts',
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const response = await axios.get(
      `https://ecommercemern-pzo0.onrender.com/api/shop/products/get?${query}`
    );

    return response?.data;
  }
);

export default shopProductSlice.reducer;
