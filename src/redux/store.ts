import { configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { productsSlice } from './slices/productsSlice';
import { productItemSlice } from './slices/productItemSlice/productItemSlice';


const store = configureStore({
    reducer: {
        productsData: productsSlice.reducer,
        productItemData: productItemSlice.reducer,
    },
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<RootDispatch>();