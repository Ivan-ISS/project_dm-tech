import { RootState } from '@/redux/store';

export const selectCart = (state: RootState) => state.cartSlice.cart;
export const selectCartReqArgs = (state: RootState) => state.cartSlice.cartReqArgs;
export const selectTotalPrice = ( state: RootState ) => state.cartSlice.totalPrice;