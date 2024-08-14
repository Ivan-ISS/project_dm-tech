import { RootState } from '../../store';

export const selectProducts = (state: RootState) => state.productsData.products;
export const selectParams = (state: RootState) => state.productsData.params;
export const selectIsPagination = (state: RootState) => state.productsData.isPagination;
export const selectStatus = (state: RootState) => state.productsData.status;