import * as styles from './info.module.scss';
import formatDate from '@/utils/formatDate';
import Price from '../../../../Common/Price/price';

export interface InfoProps {
    createdAt: string;
    price: number;
}

export default function Info({ createdAt, price }: InfoProps) {

    return (
        <div className={styles.info}>
            <div className={styles.label}>Оформлено</div>
            <div className={styles.value}>{formatDate(createdAt)}</div>
            <div className={styles.label}>На сумму</div>
            <div className={styles.value}><Price price={price} size={'small'}/></div>
        </div>
    );
}