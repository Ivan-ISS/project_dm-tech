import { RootState } from '@/redux/store';

export const selectSingleOrder = (state: RootState) => state.ordersData.singleOrder;