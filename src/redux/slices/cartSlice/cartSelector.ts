import { RootState } from '@/redux/store';

export const selectCart = (state: RootState) => state.cartSlice.cart;
export const selectCartState = (state: RootState) => state.cartSlice.cartState.data;
export const selectTotalPrice = ( state: RootState ) => state.cartSlice.totalPrice;