import { RootState } from '../../store';

export const selectItemProduct = (state: RootState) => state.productItemData.product;