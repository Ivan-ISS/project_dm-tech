import * as styles from './productBasketCard.module.scss';
import { IProduct } from '@/types/entityTypes';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '@/redux/store';
import { addToCartReqArgs } from '@/redux/slices/cartSlice/cartSlice';
import Counter from '../Common/Counter/counter';
import Item from '../Common/Item/item';
import Trash from '@/assets/images/svg/trash.svg';
import placeholderImg from '@/assets/images/png/placeholderImg.png';
import formatToPrice from '@/utils/formatToPrice';

export interface ProductBasketCardProps {
    product: IProduct
    quantity: number;
}

export default function ProductBasketCard({ product, quantity }: ProductBasketCardProps) {
    const { id, title, price, picture } = product;
    const [imageUrl, setImageUrl] = useState(placeholderImg);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (picture) {
            const img = new Image();
            img.src = picture;
            img.onload = () => setImageUrl(picture);
            img.onerror = () => setImageUrl(placeholderImg);
        }
    }, [picture]);

    const handleClickCounter = async (id: string, quantity: number) => {
        dispatch(addToCartReqArgs({ id, quantity }));
    };

    return (
        <div className={styles.basketCard}>
            <div className={styles.imgBlock}>
                <img className={styles.image} src={imageUrl} alt={'product image'}/>
            </div>
            <div className={styles.title}>
                {title}
            </div>
            <div className={styles.counterWrap}>
                <Counter idEntity={id} value={quantity} canBeDisabled={true} handleClickCounter={handleClickCounter}/>
            </div>
                <div className={styles.price}>
                { 
                    quantity > 0
                    ?
                    <>
                        <div className={styles.priceForOne}>
                            {price && formatToPrice(price)} &#8381; за шт
                        </div>
                        <div className={styles.priceForAll}>
                            {price && formatToPrice(price * quantity)} &#8381;
                        </div>
                    </>
                    :
                    <button className={styles.trashButton} onClick={ () => handleClickCounter(id, -1) }>
                        <Trash width={20} height={20}/>
                        <Item text={'Удалить'}/>
                    </button>
                }
                </div>
        </div>
    );
}