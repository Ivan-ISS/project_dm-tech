import * as styles from './products.module.scss';
import { useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { selectProducts, selectStatus } from '@/redux/slices/productsSelector';
import { fetchProducts, increasePage, changePagination } from '@/redux/slices/productsSlice';
import { updateCart } from '@/redux/slices/cartSlice/cartSlice';
import { selectCartReqArgs, selectCart } from '@/redux/slices/cartSlice/cartSelector';
import { selectParams, selectIsPagination } from '@/redux/slices/productsSelector';
import ProductCard from './ProductCard/productCard';
import Pagination from '../../Common/Pagination/pagination';
import Switch from '../../Common/Switch/switch';
import Loader from '../../../Components/Common/Loader/loader';
import useScrollBot from '@/hooks/useScrollBot';

export default function Products() {
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus);
    const { limit, currentPage, totalProducts, totalPages } = useAppSelector(selectParams);
    const products = useAppSelector(selectProducts);
    const cartReqArgs = useAppSelector(selectCartReqArgs);
    const cart = useAppSelector(selectCart);
    const isPagination = useAppSelector(selectIsPagination);

    const { targetElement: section } = useScrollBot({
        func: async () => {
            if (!isPagination && status === 'successfully' && totalProducts > limit * (currentPage - 1)) {
                await dispatch(fetchProducts({ page: currentPage, limit: limit }));
                dispatch(increasePage());
            }
        }
    });

    useEffect(() => {
        if (cartReqArgs.data.length || (cart.length === 1 && !cartReqArgs.data.length)) {
            dispatch(updateCart({ data: cartReqArgs.data }));
        }
    }, [cart.length, cartReqArgs.data, dispatch]);

    const handleClickPagination = useCallback((currentPage: number) => {
        dispatch(fetchProducts({ page: currentPage, limit: limit }));
    }, [dispatch, limit]); // В useCallback ф-я не пересоздается при каждом рендере

    return (
        <section ref={section} className={styles.products}>
            <Switch
                onClick={() => dispatch(changePagination())}
                isActive={isPagination}
                label={'Вкл/выкл пагинацию'}
            />
            { status === 'in progress' && 
                (!products.length || isPagination) ? (
                    <div className={styles.elLoader}>
                        <Loader/>
                    </div>
                ) : (
                    <div className={styles.wrapShowcase}>
                        <div className={styles.showcase}>
                            {products.map((product, index) => (
                                <ProductCard key={index} product={product}/>
                            ))}
                        </div>
                    </div>
                )
            }
            { isPagination && (
                <Pagination
                    totalPages={totalPages}
                    handlePagination={handleClickPagination}
                />
            )}
        </section>
    );
}