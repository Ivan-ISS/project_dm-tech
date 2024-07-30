import * as styles from './productItem.module.scss';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { fetchProduct } from '@/redux/slices/productItemSlice/productItemSlice';
import { selectItemProduct } from '@/redux/slices/productItemSlice/productSliceSelector';
import ProductDetailedCard from '../../ProductDetailedCard/productDetailedCard';

export default function ProductItem() {
    const dispatch = useAppDispatch();
    const product = useAppSelector(selectItemProduct);
    const { id } = useParams();
    // const product = products.find(product => product.id === id);

    useEffect(() => {
        dispatch(fetchProduct({ id: id as string }));
    }, [dispatch, id]);

    return (
        <section className={styles.productItem}>
            <ProductDetailedCard product={product}/>
        </section>
    );
}