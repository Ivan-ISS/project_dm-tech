import * as styles from './orders.module.scss';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getOrders, increasePage } from '@/redux/slices/ordersSlice/ordersSlice';
import { selectOrders, selectQueryParams, selectTotalOrders, selectOrdersStatus } from '@/redux/slices/ordersSlice/ordersSelector';
import { updateCart } from '@/redux/slices/cartSlice/cartSlice';
import { selectCartReqArgs, selectCart } from '@/redux/slices/cartSlice/cartSelector';
import OrderCard from '../../OrderCard/orderCard';
import useScrollBot from '@/hooks/useScrollBot';

export default function Orders() {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(selectOrders);
    const queryParams = useAppSelector(selectQueryParams);
    const totalOrders = useAppSelector(selectTotalOrders);
    const ordersStatus = useAppSelector(selectOrdersStatus);
    const cartReqArgs = useAppSelector(selectCartReqArgs);
    const cart = useAppSelector(selectCart);
    const { targetElement: section } = useScrollBot({
        func: async () => {
            if (ordersStatus === 'successfully' && totalOrders > queryParams.limit * (queryParams.currentPage - 1)) {
                await dispatch(getOrders({ page: queryParams.currentPage, limit: queryParams.limit }));
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
                    <OrderCard key={index} order={order} orderIndex={index + 1} handleClickOrder={ () => null }/>
                ))}
            </div>
        </section>
    );
}