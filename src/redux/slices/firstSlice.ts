import { createSlice } from '@reduxjs/toolkit';

export const firstSlice = createSlice({
    name: 'auth',
    initialState: {
        counter: 0,
        status: 'not started',
        error: '',
    },
    reducers: {
        inc: (state) => {
            state.counter = state.counter + 1;
        }
    },
});

export const { inc } = firstSlice.actions;