import * as styles from './price.module.scss';
import formatToPrice from '@/utils/formatToPrice';

export interface PriceProps {
    price: number;
    size: 'tiny' | 'small' | 'medium' | 'large' | 'huge';
    text?: string;
}

export default function Price({ price, size, text }: PriceProps) {
    return (
        <div className={styles[size]}>
            {price && formatToPrice(price)} &#8381; {text || ''}
        </div>
    );
}
