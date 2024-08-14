import { productsLoadParams, ordersLoadParams } from '@/data';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { fetchProducts, increasePage } from '@/redux/slices/productsSlice/productsSlice';
import { selectIsPagination } from '@/redux/slices/productsSlice/productsSelector';
import { getCart } from '@/redux/slices/cartSlice/cartSlice';
import { getOrders, increasePage as increasePageOrders } from '@/redux/slices/ordersSlice/ordersSlice';
import { selectSingleOrder } from '@/redux/slices/ordersSlice/ordersSelector';
import Layout from '@/Components/Layout/layout';

export default function App() {
    const isPagination = useAppSelector(selectIsPagination);
    const singleOrder = useAppSelector(selectSingleOrder);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch, singleOrder]);

    useEffect(() => {
        dispatch(getOrders({ page: productsLoadParams.firstPage, limit: productsLoadParams.limit }));
        dispatch(increasePageOrders());

        dispatch(fetchProducts({ page: ordersLoadParams.firstPage, limit: ordersLoadParams.limit }));
        dispatch(increasePage());
    }, [dispatch, isPagination]);

    return (
        <Layout/>
    );
}