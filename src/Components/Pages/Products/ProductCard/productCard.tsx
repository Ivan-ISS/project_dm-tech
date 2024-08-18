import * as styles from './productCard.module.scss';
import { IProduct } from '@/types/entityTypes';
import { useNavigate } from 'react-router-dom';
import routes from '@/routes';
import Picture from '../../../Common/Picture/picture';
import Title from '../../../Common/Title/title';
import Rating from '../../../Common/Rating/rating';
import Price from '../../../Common/Price/price';

export interface ProductCardProps {
    product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { id, title, price, picture, rating } = product;
    const navigate = useNavigate();

    const handleClickCard = () => {
        navigate(`${routes.product()}/${id}`);
    };

    return (
        <div className={styles.card} onClick={handleClickCard}>
            <div className={styles.imgBlock}>
                <Picture src={picture} alt={'product image'} />
            </div>
            <div className={styles.infoBlock}>
                <Title text={title} view={'trancated'} />
                <div className={styles.elCard}>
                    <Rating rating={rating} />
                </div>
                <Price price={price} size={'large'} />
            </div>
        </div>
    );
}
