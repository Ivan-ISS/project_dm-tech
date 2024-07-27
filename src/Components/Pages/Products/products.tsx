import * as styles from './products.module.scss';
import { useAppSelector } from '@/redux/store';
import { selectProducts } from '@/redux/slices/productsSelector';
import ProductShortCard from '@/Components/productShortCard/productShortCard';

export default function Products() {
    const products = useAppSelector(selectProducts);

    return (
        <section className={styles.products}>
            <div className={styles.showcase}>
                {products.length && products.map((product) => (
                    <ProductShortCard key={product.id} product={product}/>
                ))}
            </div>
        </section>
    );
}