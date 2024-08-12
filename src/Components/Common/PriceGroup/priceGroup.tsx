import * as styles from './priceGroup.module.scss';
import Price from '../../Common/Price/price';

export interface PriceGroupProps {
    price: number;
    quantity: number;
}

export default function PriceGroup({ price, quantity }: PriceGroupProps) {

    return (
        <div className={styles.group}>
            <Price price={price} size={'tiny'} text={'за шт'}/>
            <Price price={price * quantity} size={'medium'}/>
        </div>
    );
}