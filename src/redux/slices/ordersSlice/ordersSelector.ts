import { RootState } from '@/redux/store';

export const selectSingleOrder = (state: RootState) => state.ordersData.singleOrder;
export const selectOrders = (state: RootState) => state.ordersData.orders;