import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { fetchProducts, increasePage, setFrontPageProdcuts } from '@/redux/slices/productsSlice';
import { selectQueryParams, selectProducts } from '@/redux/slices/productsSelector';
import { getCart } from '@/redux/slices/cartSlice/cartSlice';
import { getOrders, increasePage as increasePageOrders } from '@/redux/slices/ordersSlice/ordersSlice';
import { selectSingleOrder, selectQueryParams as selectOrdersQueryParams } from '@/redux/slices/ordersSlice/ordersSelector';
import Layout from '@/Components/Layout/layout';

export default function App() {
    const queryParams = useAppSelector(selectQueryParams);
    const ordersQueryParams = useAppSelector(selectOrdersQueryParams);
    const products = useAppSelector(selectProducts);
    const singleOrder = useAppSelector(selectSingleOrder);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch, singleOrder]);

    useEffect(() => {
        dispatch(getOrders({ page: ordersQueryParams.currentPage, limit: ordersQueryParams.limit }));
        dispatch(increasePageOrders());

        dispatch(fetchProducts({ page: queryParams.currentPage, limit: queryParams.limit }));
        dispatch(increasePage());
    }, [dispatch]);

    useEffect(() => {
        dispatch(setFrontPageProdcuts());
    }, [dispatch, products]);

    return (
        <Layout/>
    );
}