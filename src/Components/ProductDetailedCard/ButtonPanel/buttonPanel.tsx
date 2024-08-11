import * as styles from './buttonPanel.module.scss';
import { IResultValidateCart } from '@/types/dataTypes';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { addToCartReqArgs } from '@/redux/slices/cartSlice/cartSlice';
import { selectCart, selectTotalPrice } from '@/redux/slices/cartSlice/cartSelector';
import { submitCart } from '@/redux/slices/ordersSlice/ordersSlice';
import PrimaryButton from '@/Components/Common/Buttons/PrimaryButton/primaryButton';
import Counter from '@/Components/Common/Counter/counter';
import validateCart from '@/utils/validateCart';
import hasProductInCart from '@/utils/hasProductInCart';
import findProductInCart from '@/utils/findProductInCart';

export interface ButtonPanelProps {
    id: string;
}

export default function ButtonPanel({ id }: ButtonPanelProps) {
    const [ resValidate, setResValidate ] = useState<IResultValidateCart>();
    const cart = useAppSelector(selectCart);
    const totalPrice = useAppSelector(selectTotalPrice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setResValidate(validateCart(cart, totalPrice));
    }, [cart, totalPrice]);

    const handleClickAddToCart = async () => {
        dispatch(addToCartReqArgs( [{ id, quantity: 1 }] ));
    };

    const handleClickCounter = async (id: string, quantity: number) => {
        dispatch(addToCartReqArgs( [{ id, quantity }] ));
    };

    const handleClickOrder = () => {
        dispatch(submitCart());
    };

    return (
        <>
            {
                !hasProductInCart(cart, id)
                ? 
                <PrimaryButton text={'Добавить в корзину'} onClick={handleClickAddToCart}/>
                :
                <div className={styles.buttonPanel}>
                    <Counter
                        idEntity={id}
                        value={findProductInCart(cart, id)?.quantity || 0}
                        handleClickCounter={handleClickCounter}
                    /> 
                    <PrimaryButton
                        text={'Оформить заказ'}
                        isDisabled={ resValidate && (
                            !resValidate.maxPrice.isValid ||
                            !resValidate.minPrice.isValid ||
                            !resValidate.maxQuantity.isValid
                        )}
                        onClick={handleClickOrder}
                    />
                </div>
            }
            { resValidate && !resValidate.maxPrice.isValid ? <div className={styles.errorMessage}>{resValidate.maxPrice.error}</div> : null }
        </>
    );
}