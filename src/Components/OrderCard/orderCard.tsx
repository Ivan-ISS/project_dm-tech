import * as styles from './orderCard.module.scss';
import { IOrderInfo } from '@/types/entityTypes';
import { useState, useEffect } from 'react';
import Picture from '../Common/Picture/picture';
import OrderModal from '../Common/Modal/OrderModal/orderModal';
import OrderWidget from '../OrderWidget/orderWidget';
import formatToPrice from '@/utils/formatToPrice';
import usePortal from '@/hooks/usePortal';
import formatDate from '@/utils/formatDate';
import useScreenSize from '@/hooks/useScreenSize';

export interface OrderCardProps {
    order: IOrderInfo[];
    orderIndex: number;
    handleClickOrder: () => void;
}

export default function OrderCard({ order, orderIndex }: OrderCardProps) {
    const { isOpenPortal, openPortal, closePortal, Portal } = usePortal();
    const [ price, setPrice] = useState<number>(0);
    const [ numImg, setNumImg ] = useState<number>(8);
    const [ widthImgLine, setWidthImgLine ] = useState<number>(464);
    const [ screenWidth ] = useScreenSize();

    useEffect(() => {
        setPrice(order.reduce((sum, item) => {
            return sum + item.quantity * item.product.price;
        }, 0));
    }, [order]);

    useEffect(() => {
        if (screenWidth > 900) {
            setWidthImgLine(464);
            setNumImg(8);
        }
        if (screenWidth > 600 && screenWidth < 900) {
            setWidthImgLine(264);
            setNumImg(4);
        }
        if (screenWidth < 600) {
            setWidthImgLine(124);
            setNumImg(2);
        }
    }, [screenWidth]);

    return (
        <div className={styles.orderCard} onClick={openPortal}>
            <div className={styles.orderNumber}>
                <div className={styles.label}>Заказ</div>
                <div className={styles.number}>№ {orderIndex}</div>
            </div>
            <div style={{ minWidth: `${widthImgLine}`, maxWidth: `${widthImgLine}` }} className={styles.orderImgLine}>
                {order.map((item, index) => (
                    index < numImg
                    ? 
                    <div key={index} className={styles.imgBlock}>
                        <Picture src={item.product.picture} alt={'product image'}/>
                    </div>
                    : 
                    index === order.length - 1
                    ?
                    <div key={index} className={styles.ellipsis}>
                        ... 
                    </div>
                    :
                    null
                ))}
            </div>
            <div className={styles.orderInfo}>
                <div className={styles.info}>
                    <div className={styles.label}>Оформлено</div>
                    <div className={styles.value}>{formatDate(order[0].createdAt)}</div>
                    <div className={styles.label}>На сумму</div>
                    <div className={styles.value}>{formatToPrice(price)} &#8381;</div>
                </div>
            </div>
            { isOpenPortal && <Portal><OrderModal insert={<OrderWidget order={order} orderIndex={orderIndex}/>} overlay={true} closeModal={closePortal}/></Portal> }
        </div>
    );
}