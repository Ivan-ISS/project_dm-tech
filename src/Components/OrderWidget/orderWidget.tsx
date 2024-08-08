import * as styles from './orderWidget.module.scss';
import { IOrderInfo } from '@/types/entityTypes';
import ProductOrderCard from '../ProductOrderCard/productOrderCard';
import PrimaryBurron from '../Common/PrimaryButton/primaryButton';


export interface CartWidgetProps {
    order: IOrderInfo[];
    orderIndex: number;
}

export default function CartWidget({ order, orderIndex }: CartWidgetProps) {

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
            <PrimaryBurron style={{ maxWidth: '300px', alignSelf: 'end' }} text={'Добавить в корзину'}/>
        </div>
    );
}