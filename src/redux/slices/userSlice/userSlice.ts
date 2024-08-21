import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IState {
    scrollPosition: number;
    pagePosition: number;
    filtersPanelShow: boolean;
}

export const userSlice = createSlice({
    name: 'scroll',
    initialState: {
        scrollPosition: 0,
        pagePosition: 1,
        filtersPanelShow: false,
    },
    reducers: {
        rememberScroll(state, action: PayloadAction<number>) {
            state.scrollPosition = action.payload;
        },
        rememberPage(state, action: PayloadAction<number>) {
            state.pagePosition = action.payload;
        },
        changeFiltersPanelShow(state) {
            state.filtersPanelShow = !state.filtersPanelShow;
        },
    },
});

export const { rememberScroll, rememberPage, changeFiltersPanelShow } = userSlice.actions;
