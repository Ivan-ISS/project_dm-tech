import * as styles from './orderNumber.module.scss';

export interface OrderNumberProps {
    orderNum: number;
}

export default function OrderNumber({ orderNum }: OrderNumberProps) {
    return (
        <div className={styles.orderNumber}>
            <div className={styles.label}>Заказ</div>
            <div className={styles.value}>№ {orderNum}</div>
        </div>
    );
}
