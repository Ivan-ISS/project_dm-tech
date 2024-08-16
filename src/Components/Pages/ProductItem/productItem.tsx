import * as styles from './productItem.module.scss';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { fetchProduct } from '@/redux/slices/productItemSlice/productItemSlice';
import { selectProduct, selectStatus, selectError } from '@/redux/slices/productItemSlice/productItemSelector';
import ProductDetailedCard from './ProductDetailedCard/productDetailedCard';
import IconButton from '../../Common/Buttons/IconButton/iconButton';
import WheelLoader from '../../Common/Loader/WheelLoader/wheelLoader';
import Error from '../LoadError/loadError';

export default function ProductItem() {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectError);
    const status = useAppSelector(selectStatus);
    const product = useAppSelector(selectProduct);
    const navigate = useNavigate();
    const { id } = useParams();
    // const product = products.find(product => product.id === id);

    useEffect(() => {
        dispatch(fetchProduct({ id: id as string }));
    }, [dispatch, id]);

    return (
        <section className={styles.productItem}>
            <div className={styles.elIconButton} onClick={() => navigate(-1)}>
                <IconButton iconName={'arrowLeft'} text={'Назад'}/>
            </div>
            {status === 'in progress' ? (
                <div className={styles.elLoader}>
                    <WheelLoader/>
                </div>
            ) : error ? (
                <Error text={error}/> 
            ) : (
                <ProductDetailedCard product={product}/>
            )}
        </section>
    );
}