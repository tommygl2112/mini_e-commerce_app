import { createSlice } from '@reduxjs/toolkit';
import products from '../data/products';

const initialState = {
  products: [],
  selectedProduct: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productsFetched: (state, action) => {
      state.products = action.payload;
    },
    setSelectedProduct: (state, action) => {
      const productId = action.payload;
      state.selectedProduct = state.products.find((p) => p.id === productId);
    },
  },
});
