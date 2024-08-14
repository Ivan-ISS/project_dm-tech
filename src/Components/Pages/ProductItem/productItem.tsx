import * as styles from './productItem.module.scss';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { fetchProduct } from '@/redux/slices/productItemSlice/productItemSlice';
import { selectProduct, selectStatus, selectError } from '@/redux/slices/productItemSlice/productSliceSelector';
import { updateCart } from '@/redux/slices/cartSlice/cartSlice';
import { selectCart, selectCartReqArgs } from '@/redux/slices/cartSlice/cartSelector';
import ProductDetailedCard from './ProductDetailedCard/productDetailedCard';
import ArrowLeft from '@/assets/images/svg/arrowLeft.svg';
import Item from '../../Common/Item/item';
import Loader from '../../Common/Loader/loader';
import Error from '../LoadError/loadError';

export default function ProductItem() {
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus);
    const product = useAppSelector(selectProduct);
    const { id } = useParams();
    const cartReqArgs = useAppSelector(selectCartReqArgs);
    const cart = useAppSelector(selectCart);
    const error = useAppSelector(selectError);
    const navigate = useNavigate();
    // const product = products.find(product => product.id === id);

    useEffect(() => {
        dispatch(fetchProduct({ id: id as string }));
    }, [dispatch, id]);

    useEffect(() => {
        if (cartReqArgs.data.length || (cart.length === 1 && !cartReqArgs.data.length)) {
            dispatch(updateCart({ data: cartReqArgs.data }));
        }
    }, [cart.length, cartReqArgs.data, dispatch]);

    return (
        <section className={styles.productItem}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>
                <ArrowLeft width={20} height={20}/>
                <Item text={'Назад'}/>
            </button>
            {status === 'in progress' ? (
                <div className={styles.elLoader}>
                    <Loader/>
                </div>
            ) : error ? (
                <Error text={error}/> 
            ) : (
                <ProductDetailedCard product={product}/>
            )}
        </section>
    );
}