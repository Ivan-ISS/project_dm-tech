import { RootState } from '../../store';

export const selectInitialFilters = (state: RootState) => state.filtersData.initialFilters;
export const selectFilters = (state: RootState) => state.filtersData.appliedFilters;
