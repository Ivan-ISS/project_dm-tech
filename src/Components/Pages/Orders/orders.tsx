import * as styles from './orders.module.scss';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getOrders, increasePage } from '@/redux/slices/ordersSlice/ordersSlice';
import { selectOrders, selectQueryParams, selectTotalOrders, selectOrdersStatus } from '@/redux/slices/ordersSlice/ordersSelector';
import OrderCard from '../../OrderCard/orderCard';
import useScrollBot from '@/hooks/useScrollBot';

export default function Orders() {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(selectOrders);
    const queryParams = useAppSelector(selectQueryParams);
    const totalOrders = useAppSelector(selectTotalOrders);
    const ordersStatus = useAppSelector(selectOrdersStatus);
    const { targetElement: section } = useScrollBot({
        func: async () => {
            if (ordersStatus === 'successfully' && totalOrders > queryParams.limit * (queryParams.currentPage - 1)) {
                await dispatch(getOrders({ page: queryParams.currentPage, limit: queryParams.limit }));
                dispatch(increasePage());
                console.log('queryParams.currentPage: ', queryParams.currentPage);
            }
        }
    });

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