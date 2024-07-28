import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { fetchProducts, increasePage } from '@/redux/slices/productsSlice';
import { selectQueryParams } from '@/redux/slices/productsSelector';
import Layout from '@/Components/Layout/layout';

export default function App() {
    const queryParams = useAppSelector(selectQueryParams);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts({ page: queryParams.currentPage, limit: queryParams.limit }));
        dispatch(increasePage());
    }, [dispatch]);

    return (
        <Layout/>
    );
}