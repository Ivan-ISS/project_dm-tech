import * as styles from './basketWidgetCard.module.scss';
import { IProduct } from '@/types/entityTypes';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/redux/store';
import { addToCart } from '@/redux/slices/cartSlice/cartSlice';
import routes from '@/routes';
import PriceGroup from '../../Common/PriceGroup/priceGroup';
import Picture from '../../Common/Picture/picture';
import Title from '../../Common/Title/title';
import Counter from '../../Common/Counter/counter';
import IconButton from '../../Common/Buttons/IconButton/iconButton';

export interface BasketWidgetCardProps {
    product: IProduct
    quantity: number;
    handleClickCard: () => void;
}

export default function BasketWidgetCard({ product, quantity, handleClickCard }: BasketWidgetCardProps) {
    const { id, title, price, picture } = product;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleClickBtn = async (id: string, quantity: number) => {
        dispatch(addToCart([{ id, quantity }]));
    };

    const handleClickImgTitle = () => {
        handleClickCard();
        navigate(`${routes.product()}/${id}`);
    };

    return (
        <div className={styles.card}>
            <div className={styles.imgBlock} onClick={handleClickImgTitle}>
                <Picture src={picture} alt={'product image'}/>
            </div>
            <div className={styles.elTitle} onClick={handleClickImgTitle}>
                <Title text={title} view={'trancated'}/>
            </div>
            <div className={styles.elCounter}>
                <Counter idEntity={id} value={quantity} canBeDisabled={true} handleClickCounter={handleClickBtn}/>
            </div>
            {
                quantity > 0 &&
                <div className={styles.elCard}>
                    <PriceGroup price={price} quantity={quantity}/>
                </div>
            }
            {
                quantity <= 0 &&
                <div className={styles.elCard}>
                    <IconButton iconName={'trash'} text={'Удалить'} onClick={ () => handleClickBtn(id, -1) }/>
                </div>
            }
        </div>
    );
}