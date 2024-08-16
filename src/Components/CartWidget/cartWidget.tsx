import * as styles from './cartWidget.module.scss';
import { defaultStateValid } from '@/data';
import { IResultValidateCart } from '@/types/dataTypes';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { selectCart, selectTotalPrice } from '@/redux/slices/cartSlice/cartSelector';
import { fetchSubmitCart } from '@/redux/slices/ordersSlice/ordersSlice';
import validateCart from '@/utils/validateCart';
import BasketWidgetCard from './BasketWidgetCard/basketWidgetCard';
import GroupMessage from './GroupMessage/groupMessage';
import SingleMessage from './SingleMessage/singleMessage';
import Title from '../Common/Title/title';
import Price from '../Common/Price/price';
import PrimaryButton from '../Common/Buttons/PrimaryButton/primaryButton';

export interface CartWidgetProps {
    handleClickWidget: () => void;
}

export default function CartWidget({ handleClickWidget }: CartWidgetProps) {
    const dispatch = useAppDispatch();
    const cart = useAppSelector(selectCart);
    const totalPrice = useAppSelector(selectTotalPrice);
    const [ resValidate, setResValidate ] = useState<IResultValidateCart>(defaultStateValid);

    useEffect(() => {
        setResValidate(validateCart(cart, totalPrice));
    }, [cart, totalPrice]);

    const handleClickBtn = () => {
        handleClickWidget();
        dispatch(fetchSubmitCart());
    };

    return (
        <div className={styles.widget}>
            {
                cart.length
                ?
                <ul className={styles.list}>
                    {cart.map((item, index) => (
                        <li key={index} className={styles.itemList}>
                            <BasketWidgetCard
                                product={item.product}
                                quantity={item.quantity}
                                handleClickCard={handleClickWidget}
                            />
                            <div className={styles.elSingleMessage}>
                                <SingleMessage resValidate={resValidate} itemId={item.product.id}/>
                            </div>
                        </li>
                    ))}
                </ul>
                :
                <Title text={'Корзина ждёт товаров'} view={'full'}/>
            }
            <div className={styles.totalPrice}>
                <div className={styles.label}>Итого</div>
                <Price price={totalPrice} size={'huge'}/>
            </div>
            <PrimaryButton
                text={'Оформить заказ'}
                isDisabled={
                    !resValidate.maxPrice.isValid ||
                    !resValidate.minPrice.isValid ||
                    !resValidate.maxQuantity.isValid
                }
                onClick={handleClickBtn}
            />
            <GroupMessage resValidate={resValidate}/>
        </div>
    );
}