import * as styles from './orderWidget.module.scss';
import { IOrderInfo } from '@/types/entityTypes';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '@/redux/store';
import { addToCartReqArgs } from '@/redux/slices/cartSlice/cartSlice';
import OrderWidgetCard from './OrderWidgetCard/orderWidgetCard';
import PrimaryBurron from '../Common/Buttons/PrimaryButton/primaryButton';


export interface OrderWidgetProps {
    order: IOrderInfo[];
    orderIndex: number;
    handleClick: () => void;
}

export default function OrderWidget({ order, orderIndex, handleClick }: OrderWidgetProps) {
    const dispatch = useAppDispatch();
    const [ cartReqArgs, setCartReqArgs ] = useState<{ id: string, quantity: number }[]>([]);

    useEffect(() => {
        const updatedCartReqArgs = order.map(item => ({
            id: item.product.id,
            quantity: item.quantity
        }));
        setCartReqArgs(updatedCartReqArgs);
    }, [order]);

    const handleClickAddToCart = () => {
        handleClick();
        dispatch(addToCartReqArgs(cartReqArgs));
    };

    return (
        <div className={styles.widget}>
            <h2 className={styles.heading}>
                Состав заказа № {orderIndex}
            </h2>
            <ul className={styles.list}>
                {order.map((item, index) => (
                    <li key={index}>
                        <OrderWidgetCard data={item}/>
                    </li>
                ))}
            </ul>
            <div className={styles.button}>
                <PrimaryBurron text={'Добавить в корзину'} onClick={handleClickAddToCart}/>
            </div>
        </div>
    );
}