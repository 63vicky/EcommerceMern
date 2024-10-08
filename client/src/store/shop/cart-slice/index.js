import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, userId, quantity }) => {
    const response = await axios.post(
      `https://ecommercemern-pzo0.onrender.com/api/shop/cart/add`,
      { productId, userId, quantity }
    );

    return response?.data;
  }
);

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (userId) => {
    const response = await axios.get(
      `https://ecommercemern-pzo0.onrender.com/api/shop/cart/get/${userId}`
    );

    return response?.data;
  }
);

export const deleteCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async ({ productId, userId }) => {
    const response = await axios.delete(
      `https://ecommercemern-pzo0.onrender.com/api/shop/cart/${userId}/${productId}`
    );

    return response?.data;
  }
);

export const updateCartQuantity = createAsyncThunk(
  'cart/updateCartQuantity',
  async ({ productId, userId, quantity }) => {
    const response = await axios.put(
      `https://ecommercemern-pzo0.onrender.com/api/shop/cart/update-cart`,
      { productId, userId, quantity }
    );

    return response?.data;
  }
);

const shopCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shopCartSlice.reducer;
