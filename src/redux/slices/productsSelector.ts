import { RootState } from '../store';

export const selectProducts = (state: RootState) => state.productsData.products;
export const selectQueryParams = (state: RootState) => state.productsData.queryParams;
export const selectTotalProducts = (state: RootState) => state.productsData.totalProducts;
export const selectIsPagination = (state: RootState) => state.productsData.isPagination;