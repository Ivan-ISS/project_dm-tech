import * as styles from './productDetailedCard.module.scss';
import { IProduct } from '@/types/entityTypes';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { updateCart, addToCartReqArgs } from '@/redux/slices/cartSlice/cartSlice';
import { selectCart, selectCartReqArgs } from '@/redux/slices/cartSlice/cartSelector';
import Stars from '@/assets/images/svg/stars.svg';
import ArrowUndo from '@/assets/images/svg/arrowUndo.svg';
import PrimaryButton from '../Common/PrimaryButton/primaryButton';
import formatToPrice from '@/utils/formatToPrice';
import Item from '../Common/Item/item';
import Counter from '../Common/Counter/counter';
import placeholderImg from '@/assets/images/png/placeholderImg.png';
import hasProductInCart from '@/utils/hasProductInCart';
import findProductInCart from '@/utils/findProductInCart';

export interface ProductDetailedCardProps {
    product: IProduct;
}

export default function ProductDetailedCard({ product }: ProductDetailedCardProps) {
    const dispatch = useAppDispatch();
    const cartReqArgs = useAppSelector(selectCartReqArgs);
    const cart = useAppSelector(selectCart);
    const { id, title, price, picture, rating } = product;
    const [imageUrl, setImageUrl] = useState(placeholderImg);

    useEffect(() => {
        if (picture) {
            const img = new Image();
            img.src = picture;
            img.onload = () => setImageUrl(picture);
            img.onerror = () => setImageUrl(placeholderImg);
        }
    }, [picture]);

    useEffect(() => {
        dispatch(updateCart({ data: cartReqArgs.data }));
    }, [cartReqArgs.data, dispatch]);

    const handleClickAddToCart = async () => {
        dispatch(addToCartReqArgs({ id, quantity: 1 }));
    };

    const handleClickCounter = async (id: string, quantity: number) => {
        dispatch(addToCartReqArgs({ id, quantity }));
    };

    return (
        <div className={styles.detailedCard}>
            <div className={styles.data}>
                <div className={styles.imgBlock}>
                    <img className={styles.image} src={imageUrl} alt={'product image'}/>
                </div>
                <div className={styles.infoBlock}>
                    <div>
                        <h1 className={styles.title}>
                            {title}
                        </h1>
                        <div className={styles.rating}>
                            <Stars className={styles.substrate}/>
                            <Stars
                                className={styles.fill}
                                color={`${rating ? '#fabc22' : '#f2f6fa'}`}
                                clipPath={`inset(0 ${rating ? (1 - rating / 5) * 100 : 0}% 0 0)`}
                            />
                        </div>
                    </div>
                    <div>
                        <div className={styles.price}>
                            {price && formatToPrice(price)} &#8381;
                        </div>
                        {
                            !hasProductInCart(cart, id)
                            ? 
                            <PrimaryButton text={'Добавить в корзину'} onClick={handleClickAddToCart}/>
                            :
                            <div className={styles.buttonPanel}>
                                <Counter
                                    idEntity={id}
                                    value={findProductInCart(cart, id)?.quantity || 0}
                                    handleClickCounter={(id, quantity) => handleClickCounter(id, quantity)}
                                /> 
                                <PrimaryButton text={'Оформить заказ'}/>
                            </div>
                        }
                    </div>
                    <div>
                        <div className={styles.undo}>
                            <ArrowUndo className={styles.arrowUndo} width={20} height={20}/>
                            <Item text={'Условия возврата'}/>
                        </div>
                        <p>
                            Обменять или вернуть товар надлежащего качества можно в течение 14 дней с момента покупки.
                        </p>
                    </div>
                    <p className={styles.postscript}>
                        Цены в интернет-магазине могут отличаться от розничных магазинов.
                    </p>
                </div>
            </div>
            <div className={styles.description}>
                <div className={styles.label}>Описание</div>
                <p className={styles.descriptionText} dangerouslySetInnerHTML={{ __html: product.description}}></p>
            </div>
        </div>
    );
}