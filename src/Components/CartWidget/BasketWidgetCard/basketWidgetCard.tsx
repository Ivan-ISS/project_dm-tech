import * as styles from './basketWidgetCard.module.scss';
import { IProduct } from '@/types/entityTypes';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/redux/store';
import { addToCartReqArgs } from '@/redux/slices/cartSlice/cartSlice';
import PriceGroup from '../../Common/PriceGroup/priceGroup';
import Picture from '../../Common/Picture/picture';
import Title from '../../Common/Title/title';
import Counter from '../../Common/Counter/counter';
import TrashButton from './TrashButton/trashButton';
import routes from '@/routes';

export interface BasketWidgetCardProps {
    product: IProduct
    quantity: number;
    handleClickProduct: () => void;
}

export default function BasketWidgetCard({ product, quantity, handleClickProduct }: BasketWidgetCardProps) {
    const { id, title, price, picture } = product;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleClickBtn = async (id: string, quantity: number) => {
        dispatch(addToCartReqArgs([{ id, quantity }]));
    };

    const handleClickCard = () => {
        handleClickProduct();
        navigate(`${routes.product()}/${id}`);
    };

    return (
        <div className={styles.card}>
            <div className={styles.imgBlock} onClick={handleClickCard}>
                <Picture src={picture} alt={'product image'}/>
            </div>
            <div className={styles.elTitle} onClick={handleClickCard}>
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
                    <TrashButton onClick={ () => handleClickBtn(id, -1) }/>
                </div>
            }
        </div>
    );
}