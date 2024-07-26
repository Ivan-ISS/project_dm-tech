import { RootState } from '../store';

export const selectCounter = (state: RootState) => state.productsData.products;