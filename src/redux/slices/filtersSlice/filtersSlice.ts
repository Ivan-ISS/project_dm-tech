import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilters } from '@/types/dataTypes';
import { defaultFilters } from '@/data';

export interface IFiltersState {
    initialFilters: IFilters;
    appliedFilters: IFilters;
}

export const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        initialFilters: {
            defaultFilters,
        },
        appliedFilters: {
            defaultFilters,
        },
    } as IFiltersState,
    reducers: {
        applyFilters: (state, action: PayloadAction<IFilters>) => {
            state.appliedFilters = action.payload;
        },
        resetFilters: (state) => {
            state.appliedFilters = state.initialFilters;
        },
    },
});

export const { applyFilters, resetFilters } = filtersSlice.actions;
