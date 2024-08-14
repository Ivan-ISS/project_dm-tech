import * as styles from './productDetailedCard.module.scss';
import { textData } from '@/data';
import { IProduct } from '@/types/entityTypes';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { updateCart } from '@/redux/slices/cartSlice/cartSlice';
import { selectCart, selectCartReqArgs } from '@/redux/slices/cartSlice/cartSelector';
import Picture from '../../../Common/Picture/picture';
import Title from '../../../Common/Title/title';
import Rating from '../../../Common/Rating/rating';
import Price from '../../../Common/Price/price';
import Undo from './Undo/undo';
import ButtonPanel from './ButtonPanel/buttonPanel';
import Description from './Description/description';

export interface ProductDetailedCardProps {
    product: IProduct;
}

export default function ProductDetailedCard({ product }: ProductDetailedCardProps) {
    const dispatch = useAppDispatch();
    const cartReqArgs = useAppSelector(selectCartReqArgs);
    const cart = useAppSelector(selectCart);
    const { id, title, price, picture, rating, description } = product;

    useEffect(() => {
        if (cartReqArgs.data.length || (cart.length === 1 && !cartReqArgs.data.length)) {
            dispatch(updateCart({ data: cartReqArgs.data }));
        }
    }, [cart.length, cartReqArgs.data, dispatch]);

    return (
        <div className={styles.card}>
            <div className={styles.body}>
                <div className={styles.imgBlock}>
                    <Picture src={picture} alt={'product image'}/>
                </div>
                <div className={styles.infoBlock}>
                    <div className={styles.elCard}>
                        <Title text={title} view={'full'}/>
                        <Rating rating={rating}/>
                    </div>
                    <div className={styles.elCard}>
                        <Price price={price} size={'huge'}/>
                        <ButtonPanel id={id}/>
                    </div>
                    <div className={styles.elCard}>
                        <Undo/>
                        <p>{textData.productDetailedCard[0]}</p>
                    </div>
                    <p className={styles.postscript}>
                        {textData.productDetailedCard[1]}
                    </p>
                </div>
            </div>
            <Description text={description}/>
        </div>
    );
}