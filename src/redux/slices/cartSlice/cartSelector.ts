import { RootState } from '@/redux/store';

export const selectCart = (state: RootState) => state.cartData.cart;
export const selectCartState = (state: RootState) => state.cartData.cartState.data;
export const selectTotalPrice = (state: RootState) => state.cartData.totalPrice;
