import * as styles from './orders.module.scss';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { getOrders, increasePage } from '@/redux/slices/ordersSlice/ordersSlice';
import { selectOrders, selectParams, selectTotalOrders, selectStatus } from '@/redux/slices/ordersSlice/ordersSelector';
import { updateCart } from '@/redux/slices/cartSlice/cartSlice';
import { selectCartReqArgs, selectCart } from '@/redux/slices/cartSlice/cartSelector';
import ProductOrderCard from './ProductOrderCard/productOrderCard';
import useScrollBot from '@/hooks/useScrollBot';

export default function Orders() {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(selectOrders);
    const { limit, currentPage } = useAppSelector(selectParams);
    const totalOrders = useAppSelector(selectTotalOrders);
    const status = useAppSelector(selectStatus);
    const cartReqArgs = useAppSelector(selectCartReqArgs);
    const cart = useAppSelector(selectCart);
    
    const { targetElement: section } = useScrollBot({
        func: async () => {
            if (status === 'successfully' && totalOrders > limit * (currentPage - 1)) {
                await dispatch(getOrders({ page: currentPage, limit: limit }));
                dispatch(increasePage());
            }
        }
    });

    useEffect(() => {
        if (cartReqArgs.data.length || (cart.length === 1 && !cartReqArgs.data.length)) {
            dispatch(updateCart({ data: cartReqArgs.data }));
        }
    }, [cart.length, cartReqArgs.data, dispatch]);

    return (
        <section ref={section} className={styles.orders}>
            <div className={styles.set}>
                {orders.data.map((order, index) => (
                    <ProductOrderCard key={index} order={order} orderIndex={index + 1}/>
                ))}
            </div>
        </section>
    );
}