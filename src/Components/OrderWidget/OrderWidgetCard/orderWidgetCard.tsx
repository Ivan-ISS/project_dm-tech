import * as styles from './orderWidgetCard.module.scss';
import { IOrderInfo } from '@/types/entityTypes';
import { useNavigate } from 'react-router-dom';
import routes from '@/routes';
import Picture from '../../Common/Picture/picture';
import Title from '../../Common/Title/title';
import PriceGroup from '../../Common/PriceGroup/priceGroup';

export interface OrderWidgetCardProps {
    data: IOrderInfo;
}

export default function OrderWidgetCard({ data }: OrderWidgetCardProps) {
    const { id, title, price, picture } = data.product;
    const { quantity } = data;
    const navigate = useNavigate();

    const handleClickCard = () => {
        navigate(`${routes.product()}/${id}`);
    };

    return (
        <div className={styles.card} onClick={handleClickCard}>
            <div className={styles.imgBlock}>
                <Picture src={picture} alt={'product image'} />
            </div>
            <div className={styles.elTitle}>
                <Title text={title} view={'trancated'} />
            </div>
            <div>{`${quantity} шт`}</div>
            <div className={styles.elPriceGroup}>
                <PriceGroup price={price} quantity={quantity} />
            </div>
        </div>
    );
}
