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
  async () => {
    const response = await axios.get(
      'http://localhost:8080/api/shop/products/get'
    );

    return response?.data;
  }
);

export default shopProductSlice.reducer;
