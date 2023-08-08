import { configureStore } from '@reduxjs/toolkit';
import { productsSlice } from './productsSlice';
import { cartSlice } from './cartSlice';
import { userSlice } from './userSlice';

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    user: userSlice.reducer
  },
});
