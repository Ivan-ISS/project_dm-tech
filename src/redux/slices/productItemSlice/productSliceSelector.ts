import { RootState } from '../../store';

export const selectItemProduct = (state: RootState) => state.productItemData.product;
export const selectProductStatus = (state: RootState) => state.productItemData.status;
export const selectProductError = (state: RootState) => state.productItemData.error;