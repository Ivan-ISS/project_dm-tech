import * as styles from './products.module.scss';
import { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import {
    selectProducts,
    selectStatus,
    selectParams,
    selectIsPagination,
} from '@/redux/slices/productsSlice/productsSelector';
import {
    fetchProducts,
    increasePage,
    changePagination,
} from '@/redux/slices/productsSlice/productsSlice';
import { selectFilters } from '@/redux/slices/filtersSlice/filtersSelector';
import useScrollBot from '@/hooks/useScrollBot';
import ProductCard from './ProductCard/productCard';
import Pagination from '../../Common/Pagination/pagination';
import Switch from '../../Common/Switch/switch';
import FiltersPanel from './FiltersPanel/filtersPanel';
import WheelLoader from '../../../Components/Common/Loader/WheelLoader/wheelLoader';

export default function Products() {
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus);
    const products = useAppSelector(selectProducts);
    const isPagination = useAppSelector(selectIsPagination);
    const filters = useAppSelector(selectFilters);
    const { limit, currentPage, totalProducts, totalPages } = useAppSelector(selectParams);

    const { targetElement: section } = useScrollBot({
        func: async () => {
            if (
                !isPagination &&
                status === 'successfully' &&
                totalProducts > limit * (currentPage - 1)
            ) {
                await dispatch(fetchProducts({ page: currentPage, limit: limit, ...filters }));
                dispatch(increasePage());
            }
        },
    });

    const handleClickPagination = useCallback(
        (currentPage: number) => {
            dispatch(fetchProducts({ page: currentPage, limit: limit, ...filters }));
        },
        [dispatch, limit, filters]
    ); // В useCallback ф-я не пересоздается при каждом рендере

    return (
        <section ref={section} className={styles.products}>
            <Switch
                onClick={() => dispatch(changePagination())}
                isActive={isPagination}
                label={'Вкл/выкл пагинацию'}
            />
            <FiltersPanel />
            {status === 'in progress' && (!products.length || isPagination) ? (
                <div className={styles.elLoader}>
                    <WheelLoader />
                </div>
            ) : (
                <div className={styles.wrapShowcase}>
                    <div className={styles.showcase}>
                        {products.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </div>
                </div>
            )}
            {isPagination && (
                <Pagination
                    totalPages={totalPages}
                    resetPage={filters}
                    handlePagination={handleClickPagination}
                />
            )}
        </section>
    );
}
