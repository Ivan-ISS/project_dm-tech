import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { fetchProducts, increasePage, setFrontPageProdcuts } from '@/redux/slices/productsSlice';
import { selectQueryParams, selectProducts } from '@/redux/slices/productsSelector';
import Layout from '@/Components/Layout/layout';

export default function App() {
    const queryParams = useAppSelector(selectQueryParams);
    const products = useAppSelector(selectProducts);
    const dispatch = useAppDispatch();

    useEffect(() => {
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