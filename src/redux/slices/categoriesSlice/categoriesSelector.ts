import { RootState } from '../../store';

export const selectCategories = (state: RootState) => state.categoriesData.categories;
