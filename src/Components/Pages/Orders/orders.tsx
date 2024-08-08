import * as styles from './orders.module.scss';
import { useAppSelector } from '@/redux/store';
import { selectOrders } from '@/redux/slices/ordersSlice/ordersSelector';
import OrderCard from '../../OrderCard/orderCard';

export default function Orders() {
    const orders = useAppSelector(selectOrders);

    return (
        <div className={styles.orders}>
            <div className={styles.set}>
                {orders.data.map((order, index) => (
                    <OrderCard key={index} order={order} orderIndex={index + 1} handleClickOrder={ () => null }/>
                ))}
            </div>
        </div>
    );
}