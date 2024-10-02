import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
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
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
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

export const fetchProductDetails = createAsyncThunk(
  '/products/fetchAllProducts',
  async (id) => {
    const response = await axios.get(
      `https://ecommercemern-pzo0.onrender.com/api/shop/products/get/${id}`
    );

    return response?.data;
  }
);

export default shopProductSlice.reducer;
