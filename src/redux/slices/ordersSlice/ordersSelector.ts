import { RootState } from '@/redux/store';

export const selectSingleOrder = (state: RootState) => state.ordersData.singleOrder;
export const selectOrders = (state: RootState) => state.ordersData.orders;
export const selectQueryParams = (state: RootState) => state.ordersData.queryParams;
export const selectTotalOrders = (state: RootState) => state.ordersData.orders.meta.total;
export const selectOrdersStatus = (state: RootState) => state.ordersData.status;