import * as styles from './productOrderCard.module.scss';
import { IOrderInfo } from '@/types/entityTypes';
import { useState, useEffect } from 'react';
import usePortal from '@/hooks/usePortal';
import OrderNumber from './OrderNumber/orderNumber';
import ImgLine from './ImgLine/imgLine';
import Info from './Info/info';
import OrderModal from '../../../Common/Modal/OrderModal/orderModal';
import OrderWidget from '../../../OrderWidget/orderWidget';

export interface OrderCardProps {
    order: IOrderInfo[];
    orderNum: number;
}

export default function OrderCard({ order, orderNum }: OrderCardProps) {
    const pictures = order.map((item) => item.product.picture);
    const [ price, setPrice] = useState<number>(0);
    const { isOpenPortal, openPortal, closePortal, Portal } = usePortal();

    useEffect(() => {
        setPrice(order.reduce((sum, item) => {
            return sum + item.quantity * item.product.price;
        }, 0));
    }, [order]);

    return (
        <div>
            <div className={styles.card} onClick={openPortal}>
                <div className={styles.elCard}>
                    <OrderNumber orderNum={orderNum}/>
                    <ImgLine pictures={pictures}/>
                </div>
                <div className={styles.elCard}>
                    <Info createdAt={order[0].createdAt} price={price}/>
                </div>
            </div>
            {isOpenPortal && (
                <Portal>
                    <OrderModal
                        insert={
                            <OrderWidget
                                order={order}
                                orderIndex={orderNum}
                                handleClickWidget={closePortal}
                            />
                        }
                        overlay={true}
                        closeModal={closePortal}
                    />
                </Portal>
            )}
        </div>
    );
}