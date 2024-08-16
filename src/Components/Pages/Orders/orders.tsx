import * as styles from './orders.module.scss';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { fetchOrders, increasePage } from '@/redux/slices/ordersSlice/ordersSlice';
import { selectOrders, selectParams, selectStatus } from '@/redux/slices/ordersSlice/ordersSelector';
import { fetchUpdateCart } from '@/redux/slices/cartSlice/cartSlice';
import { selectCartState, selectCart } from '@/redux/slices/cartSlice/cartSelector';
import useScrollBot from '@/hooks/useScrollBot';
import ProductOrderCard from './ProductOrderCard/productOrderCard';

export default function Orders() {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(selectOrders);
    const { limit, currentPage, totalOrders } = useAppSelector(selectParams);
    const status = useAppSelector(selectStatus);
    const cartState = useAppSelector(selectCartState);
    const cart = useAppSelector(selectCart);

    const { targetElement: section } = useScrollBot({
        func: async () => {
            if (status === 'successfully' && totalOrders > limit * (currentPage - 1)) {
                await dispatch(fetchOrders({ page: currentPage, limit: limit }));
                dispatch(increasePage());
            }
        }
    });

    useEffect(() => {
        if (cartState.length || (cart.length === 1 && !cartState.length)) {
            dispatch(fetchUpdateCart({ data: cartState }));
        }
    }, [cart.length, cartState, dispatch]);

    return (
        <section ref={section} className={styles.orders}>
            <div className={styles.set}>
                {orders.map((order, index) => (
                    <ProductOrderCard key={index} order={order} orderNum={index + 1}/>
                ))}
            </div>
        </section>
    );
}