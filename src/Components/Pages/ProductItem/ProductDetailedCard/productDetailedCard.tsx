import * as styles from './productDetailedCard.module.scss';
import { textData } from '@/data';
import { IProduct } from '@/types/entityTypes';
import ButtonPanel from './ButtonPanel/buttonPanel';
import Description from './Description/description';
import Picture from '../../../Common/Picture/picture';
import Title from '../../../Common/Title/title';
import Rating from '../../../Common/Rating/rating';
import Price from '../../../Common/Price/price';
import IconButton from '../../../Common/Buttons/IconButton/iconButton';

export interface ProductDetailedCardProps {
    product: IProduct;
}

export default function ProductDetailedCard({ product }: ProductDetailedCardProps) {
    const { id, title, price, picture, rating, description } = product;

    return (
        <div className={styles.card}>
            <div className={styles.body}>
                <div className={styles.imgBlock}>
                    <Picture src={picture} alt={'product image'}/>
                </div>
                <div className={styles.infoBlock}>
                    <div className={styles.elCard}>
                        <Title text={title} view={'full'}/>
                        <Rating rating={rating}/>
                    </div>
                    <div className={styles.elCard}>
                        <Price price={price} size={'huge'}/>
                        <ButtonPanel id={id}/>
                    </div>
                    <div className={styles.elCard}>
                        <IconButton iconName={'arrowUndo'} text={'Условия возврата'}/>
                        <p>{textData.productDetailedCard[0]}</p>
                    </div>
                    <p className={styles.postscript}>
                        {textData.productDetailedCard[1]}
                    </p>
                </div>
            </div>
            <Description text={description}/>
        </div>
    );
}