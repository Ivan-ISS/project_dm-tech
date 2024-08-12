import * as styles from './cost.module.scss';
import Price from '../../Common/Price/price';

export interface CostProps {
    price: number;
    quantity: number;
}

export default function Cost({ price, quantity }: CostProps) {

    return (
        <div className={styles.cost}>
            <Price price={price} size={'tiny'} text={'за шт'}/>
            <Price price={price * quantity} size={'medium'}/>
        </div>
    );
}