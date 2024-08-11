import * as styles from './rating.module.scss';
import Stars from '@/assets/images/svg/stars.svg';

export interface RatingProps {
    rating: number;
}

export default function Rating({ rating }: RatingProps) {
    
    return (
        <div className={styles.rating}>
            <Stars className={styles.substrate}/>
            <Stars
                className={styles.fill}
                color={`${rating ? '#fabc22' : '#f2f6fa'}`}
                clipPath={`inset(0 ${rating ? (1 - rating / 5) * 100 : 0}% 0 0)`}
            />
        </div>
    );
}