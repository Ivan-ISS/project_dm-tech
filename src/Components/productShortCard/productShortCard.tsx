import * as styles from './productShortCard.module.scss';
import { IProduct } from '@/types/entityTypes';
import Picture from '../Common/Picture/picture';
import Title from '../Common/Title/title';
import Rating from '../Common/Rating/rating';
import Price from '../Common/Price/price';

export interface ProductShortCardProps {
    product: IProduct;
    handleClickCard: (id: string) => void;
}

export default function ProductShortCard({ product, handleClickCard }: ProductShortCardProps) {
    const { id, title, price, picture, rating } = product;

    return (
        <div className={styles.card} onClick={() => handleClickCard(id)}>
            <div className={styles.imgBlock}>
                <Picture src={picture} alt={'product image'}/>
            </div>
            <div className={styles.infoBlock}>
                <Title text={title} view={'trancated'}/>
                <div className={styles.elCard}>
                    <Rating rating={rating}/>
                </div>
                <Price price={price} size={'large'}/>
            </div>
        </div>
    );
}