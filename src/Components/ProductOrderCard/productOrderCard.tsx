import * as styles from './productOrderCard.module.scss';
import { IOrderInfo } from '@/types/entityTypes';
import { useNavigate } from 'react-router-dom';
import Picture from '../Common/Picture/picture';
import formatToPrice from '@/utils/formatToPrice';
import routes from '@/routes';

export interface ProductOrderCardProps {
    data: IOrderInfo;
}

export default function ProductOrderCard({ data }: ProductOrderCardProps) {
    const { id, title, price, picture } = data.product;
    const { quantity } = data;
    const navigate = useNavigate();

    const handleClickCard = () => {
        navigate(`${routes.product()}/${id}`);
    };

    return (
        <div className={styles.card} onClick={handleClickCard}>
            <div className={styles.imgBlock}>
                <Picture src={picture} alt={'product image'}/>
            </div>
            <div className={styles.title}>
                {title}
            </div>
            <div className={styles.quantity}>
                {`${quantity} шт`}
            </div>
            <div className={styles.price}>
                <div className={styles.priceForOne}>
                    {price && formatToPrice(price)} &#8381; за шт
                </div>
                <div className={styles.priceForAll}>
                    {price && formatToPrice(price * quantity)} &#8381;
                </div>
            </div>
        </div>
    );
}