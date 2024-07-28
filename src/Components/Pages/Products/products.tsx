import * as styles from './products.module.scss';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { selectProducts } from '@/redux/slices/productsSelector';
import { fetchProducts, increasePage } from '@/redux/slices/productsSlice';
import { selectQueryParams, selectTotalProducts } from '@/redux/slices/productsSelector';
import ProductShortCard from '@/Components/productShortCard/productShortCard';
import useScrollBot from '@/hooks/useScrollBot';

export default function Products() {
    const dispatch = useAppDispatch();
    const queryParams = useAppSelector(selectQueryParams);
    const totalProducts = useAppSelector(selectTotalProducts);
    const products = useAppSelector(selectProducts);
    const { targetElement: section } = useScrollBot({
        func: async () => {
            if (totalProducts > queryParams.limit * (queryParams.currentPage - 1)) {
                await dispatch(fetchProducts({ page: queryParams.currentPage, limit: queryParams.limit }));
                dispatch(increasePage());
            }
        }
    });

    return (
        <section ref={section} className={styles.products}>
            <div className={styles.showcase}>
                {products.length && products.map((product, index) => (
                    <ProductShortCard key={index} product={product}/>
                ))}
            </div>
        </section>
    );
}