import * as styles from './orderWidget.module.scss';
import { IOrderInfo } from '@/types/entityTypes';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '@/redux/store';
import { addToCartReqArgs } from '@/redux/slices/cartSlice/cartSlice';
import ProductOrderCard from '../ProductOrderCard/productOrderCard';
import PrimaryBurron from '../Common/PrimaryButton/primaryButton';


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
        <div className={styles.order}>
            <div className={styles.heading}>
                Состав заказа № {orderIndex}
            </div>
            <ul className={styles.list}>
                {order.map((item, index) => (
                    <li key={index}>
                        <ProductOrderCard data={item}/>
                    </li>
                ))}
            </ul>
            <PrimaryBurron style={{ maxWidth: '300px', alignSelf: 'end' }} text={'Добавить в корзину'} onClick={handleClickAddToCart}/>
        </div>
    );
}