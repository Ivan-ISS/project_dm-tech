import { configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { productsSlice } from './slices/productsSlice/productsSlice';
import { productItemSlice } from './slices/productItemSlice/productItemSlice';
import { cartSlice } from './slices/cartSlice/cartSlice';
import { ordersSlice } from './slices/ordersSlice/ordersSlice';
import { filtersSlice } from './slices/filtersSlice/filtersSlice';
import { categoriesSlice } from './slices/categoriesSlice/categoriesSlice';

const store = configureStore({
    reducer: {
        productsData: productsSlice.reducer,
        productItemData: productItemSlice.reducer,
        cartData: cartSlice.reducer,
        ordersData: ordersSlice.reducer,
        filtersData: filtersSlice.reducer,
        categoriesData: categoriesSlice.reducer,
    },
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<RootDispatch>();
