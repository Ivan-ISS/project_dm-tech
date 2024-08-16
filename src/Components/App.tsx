import { productsLoadParams, ordersLoadParams } from '@/data';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { fetchProducts, increasePage } from '@/redux/slices/productsSlice/productsSlice';
import { selectIsPagination } from '@/redux/slices/productsSlice/productsSelector';
import { fetchCart } from '@/redux/slices/cartSlice/cartSlice';
import { fetchOrders, increasePage as increasePageOrders } from '@/redux/slices/ordersSlice/ordersSlice';
import { selectSingleOrder } from '@/redux/slices/ordersSlice/ordersSelector';
import Layout from '@/Components/Layout/layout';

export default function App() {
    const dispatch = useAppDispatch();
    const isPagination = useAppSelector(selectIsPagination);
    const singleOrder = useAppSelector(selectSingleOrder);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch, singleOrder]);

    useEffect(() => {
        dispatch(fetchOrders({ page: productsLoadParams.firstPage, limit: productsLoadParams.limit }));
        dispatch(increasePageOrders());

        dispatch(fetchProducts({ page: ordersLoadParams.firstPage, limit: ordersLoadParams.limit }));
        dispatch(increasePage());
    }, [dispatch, isPagination]);

    return (
        <Layout/>
    );
}