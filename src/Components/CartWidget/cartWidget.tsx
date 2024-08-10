import * as styles from './cartWidget.module.scss';
import { IResultValidateCart } from '@/types/dataTypes';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { selectCart, selectTotalPrice } from '@/redux/slices/cartSlice/cartSelector';
import { submitCart } from '@/redux/slices/ordersSlice/ordersSlice';
import ProductBasketCard from '../ProductBasketCard/productBasketCard';
import PrimaryButton from '../Common/Buttons/PrimaryButton/primaryButton';
import formatToPrice from '@/utils/formatToPrice';
import validateCart from '@/utils/validateCart';

export interface CartWidgetProps {
    handleClickProduct: () => void;
}

export default function CartWidget({ handleClickProduct }: CartWidgetProps) {
    const dispatch = useAppDispatch();
    const cart = useAppSelector(selectCart);
    const totalPrice = useAppSelector(selectTotalPrice);
    const [ resValidate, setRestValidate ] = useState<IResultValidateCart>();

    useEffect(() => {
        setRestValidate(validateCart(cart, totalPrice));
    }, [cart, totalPrice]);

    const handleClickOrder = () => {
        handleClickProduct();
        dispatch(submitCart());
    };

    return (
        <div className={styles.cart}>
            {
                cart.length
                ?
                <ul className={styles.list}>
                    {cart.map((item, index) => (
                        <li key={index} className={styles.itemList}>
                            <ProductBasketCard product={item.product} quantity={item.quantity} handleClickProduct={handleClickProduct}/>
                            {
                                resValidate && resValidate.warnQuantity.productId.find(id => id === item.product.id) &&
                                <div className={styles.warningMessage}>
                                    {resValidate.warnQuantity.warning}
                                </div>
                            }
                            {
                                resValidate &&  resValidate.maxQuantity.productId.find(id => id === item.product.id) &&
                                <div className={styles.errorMessage}>
                                    {resValidate.maxQuantity.error}
                                </div>
                            }
                        </li>
                    ))}
                </ul>
                :
                <div className={styles.message}>
                    Корзина ждёт товаров
                </div>
            }
            <div className={styles.totalPrice}>
                <div className={styles.label}>Итого</div>
                <div className={styles.price}>
                    { formatToPrice(totalPrice) } &#8381;
                </div>
            </div>
            <PrimaryButton
                text={'Оформить заказ'}
                isDisabled={ resValidate && (
                    !resValidate.maxPrice.isValid ||
                    !resValidate.minPrice.isValid ||
                    !resValidate.maxQuantity.isValid
                )}
                onClick={handleClickOrder}
            />
            { resValidate && !resValidate.maxPrice.isValid ? <div className={styles.error}>{resValidate.maxPrice.error}</div> : null }
            { resValidate && !resValidate.maxQuantity.isValid ? <div className={styles.error}>{resValidate.maxQuantity.error}</div> : null }
        </div>
    );
}