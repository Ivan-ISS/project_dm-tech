import { productsLoadParams, ordersLoadParams } from '@/data';
import { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { fetchProducts, increasePage } from '@/redux/slices/productsSlice/productsSlice';
import { selectIsPagination } from '@/redux/slices/productsSlice/productsSelector';
import {
    fetchOrders,
    increasePage as increasePageOrders,
} from '@/redux/slices/ordersSlice/ordersSlice';
import { selectSingleOrder } from '@/redux/slices/ordersSlice/ordersSelector';
import { fetchCart, fetchUpdateCart } from '@/redux/slices/cartSlice/cartSlice';
import { selectCartState } from '@/redux/slices/cartSlice/cartSelector';
import Layout from '@/Components/Layout/layout';

export default function App() {
    const dispatch = useAppDispatch();
    const isPagination = useAppSelector(selectIsPagination);
    const singleOrder = useAppSelector(selectSingleOrder);
    const cartState = useAppSelector(selectCartState);
    const isFirstRender = useRef(true);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch, singleOrder]);

    useEffect(() => {
        dispatch(
            fetchProducts({ page: ordersLoadParams.firstPage, limit: ordersLoadParams.limit })
        );
        dispatch(increasePage());
    }, [dispatch, isPagination]);

    useEffect(() => {
        dispatch(
            fetchOrders({ page: productsLoadParams.firstPage, limit: productsLoadParams.limit })
        );
        dispatch(increasePageOrders());
    }, [dispatch]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        dispatch(fetchUpdateCart({ data: cartState }));
    }, [cartState, dispatch]);

    return <Layout />;
}
