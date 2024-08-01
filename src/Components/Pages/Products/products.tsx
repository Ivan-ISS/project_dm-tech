import * as styles from './products.module.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { selectProducts } from '@/redux/slices/productsSelector';
import { fetchProducts, increasePage, changePagination, reset } from '@/redux/slices/productsSlice';
import { selectQueryParams, selectTotalProducts, selectIsPagination } from '@/redux/slices/productsSelector';
// import { fetchProduct } from '@/redux/slices/productItemSlice/productItemSlice';
import ProductShortCard from '@/Components/ProductShortCard/productShortCard';
import Pagination from '../../Common/Pagination/pagination';
import Switch from '../../Common/Switch/switch';
import useScrollBot from '@/hooks/useScrollBot';
import routes from '@/routes';

export default function Products() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const queryParams = useAppSelector(selectQueryParams);
    const totalProducts = useAppSelector(selectTotalProducts);
    const products = useAppSelector(selectProducts);
    const isPagination = useAppSelector(selectIsPagination);
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const [ totalPages, setTotalPages ] = useState<number>(0);

    const { targetElement: section } = useScrollBot({
        func: async () => {
            if (!isPagination && totalProducts > queryParams.limit * (queryParams.currentPage - 1)) {
                await dispatch(fetchProducts({ page: queryParams.currentPage, limit: queryParams.limit }));
                dispatch(increasePage());
            }
        }
    });

    useEffect(() => {
        setTotalPages(Math.ceil(totalProducts / queryParams.limit));
    }, [queryParams, totalProducts]);

    useEffect(() => {
        if (!isPagination) {
            dispatch(reset());
        }
    }, [dispatch, isPagination, queryParams.limit]);

    const handleClickPagination = (currentPage: number) => {
        dispatch(fetchProducts({ page: currentPage, limit: queryParams.limit }));
    };

    const handleClickCard = (id: string) => {
        navigate(`${routes.product()}/${id}`);
        // dispatch(fetchProduct({ id: id }));
    };

    return (
        <section ref={section} className={styles.products}>
            <Switch onClick={() => dispatch(changePagination())} isActive={isPagination} label={'Вкл/выкл пагинацию'}/>
            <div className={styles.showcase}>
                {products.length && products.map((product, index) => (
                    <ProductShortCard key={index} product={product} handleClickCard={handleClickCard}/>
                ))}
            </div>
            { isPagination && totalPages &&
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    handlePagination={handleClickPagination}
                />
            }
        </section>
    );
}