import { RootState } from '../../store';

export const selectProduct = (state: RootState) => state.productItemData.product;
export const selectStatus = (state: RootState) => state.productItemData.status;
export const selectError = (state: RootState) => state.productItemData.error;
