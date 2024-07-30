import * as styles from './productShortCard.module.scss';
import { IProduct } from '@/types/entityTypes';
import { HTMLAttributes, useState, useEffect } from 'react';
import Stars from '@/assets/images/svg/stars.svg';
import placeholderImg from '@/assets/images/png/placeholderImg.png';
import formatToPrice from '@/utils/formatToPrice';

export interface ProductShortCardProps extends HTMLAttributes<HTMLDivElement> {
    product: IProduct;
    handleClickCard?: (id: string) => void;
}

export default function ProductShortCard({ product, handleClickCard, ...props }: ProductShortCardProps) {
    const { id, title, price, picture, rating } = product;
    const [imageUrl, setImageUrl] = useState(placeholderImg);

    useEffect(() => {
        if (picture) {
            const img = new Image();
            img.src = picture;
            img.onload = () => setImageUrl(picture);
            img.onerror = () => setImageUrl(placeholderImg);
        }
    }, [picture]);

    return (
        <div {...props} className={styles.productCard} onClick={() => handleClickCard && handleClickCard(id)}>
            <div className={styles.imgBlock}>
                <img className={styles.image} src={imageUrl} alt={'product image'}/>
            </div>
            <div className={styles.infoBlock}>
                <div className={styles.title}>
                    {title}
                </div>
                <div className={styles.rating}>
                    <Stars className={styles.substrate}/>
                    <Stars
                        className={styles.fill}
                        color={`${rating ? '#fabc22' : '#f2f6fa'}`}
                        clipPath={`inset(0 ${rating ? (1 - rating / 5) * 100 : 0}% 0 0)`}
                    />
                </div>
                <div className={styles.price}>
                    {price && formatToPrice(price)} &#8381;
                </div>
            </div>
        </div>
    );
}