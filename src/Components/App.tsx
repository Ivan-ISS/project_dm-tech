import { productsLoadParams, ordersLoadParams } from '@/data';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { fetchProducts, increasePage, setFrontPageProdcuts } from '@/redux/slices/productsSlice';
import { selectProducts } from '@/redux/slices/productsSelector';
import { getCart } from '@/redux/slices/cartSlice/cartSlice';
import { getOrders, increasePage as increasePageOrders } from '@/redux/slices/ordersSlice/ordersSlice';
import { selectSingleOrder } from '@/redux/slices/ordersSlice/ordersSelector';
import Layout from '@/Components/Layout/layout';

export default function App() {
    const products = useAppSelector(selectProducts);
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
    }, [dispatch]);

    useEffect(() => {
        dispatch(setFrontPageProdcuts());
    }, [dispatch, products]);

    return (
        <Layout/>
    );
}