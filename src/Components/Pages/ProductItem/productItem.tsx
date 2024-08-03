import * as styles from './productItem.module.scss';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { fetchProduct } from '@/redux/slices/productItemSlice/productItemSlice';
import { selectItemProduct, selectProductStatus, selectProductError } from '@/redux/slices/productItemSlice/productSliceSelector';
import ProductDetailedCard from '../../ProductDetailedCard/productDetailedCard';
import ArrowLeft from '@/assets/images/svg/arrowLeft.svg';
import Item from '../../Common/Item/item';
import Loader from '../../Common/Loader/loader';
import Error from '../LoadError/loadError';
import routes from '@/routes';

export default function ProductItem() {
    const dispatch = useAppDispatch();
    const productStatus = useAppSelector(selectProductStatus);
    const product = useAppSelector(selectItemProduct);
    const { id } = useParams();
    const productError = useAppSelector(selectProductError);
    const navigate = useNavigate();
    // const product = products.find(product => product.id === id);

    useEffect(() => {
        dispatch(fetchProduct({ id: id as string }));
    }, [dispatch, id]);

    return (
        <section className={styles.productItem}>
            <button className={styles.backButton} onClick={() => navigate(routes.products())}>
                <ArrowLeft width={20} height={20}/>
                <Item text={'Назад'}/>
            </button>
            { 
                productStatus === 'in progress' ?
                <div className={styles.wrapLoader}><Loader/></div> : 
                productError ?  
                <Error text={productError}/> : 
                <ProductDetailedCard product={product}/>
            }
        </section>
    );
}