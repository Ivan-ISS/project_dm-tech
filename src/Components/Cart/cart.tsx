import * as styles from './cart.module.scss';
import { HTMLAttributes } from 'react';
import { useAppSelector } from '@/redux/store';
import { selectCart } from '@/redux/slices/cartSlice/cartSelector';
import CartIcon from '@/assets/images/svg/cart.svg';
import Item from '../Common/Item/item';
import useScreenSize from '@/hooks/useScreenSize';

export interface CartProps extends HTMLAttributes<HTMLDivElement>{}

export default function Cart({ ...props }: CartProps) {
    const cart = useAppSelector(selectCart);
    const [ screenWidth ] = useScreenSize();

    return (
        <div { ...props } className={styles.cart}>
            <CartIcon width={20} height={20}/>
            <Item text={screenWidth > 560 ? 'Корзина' : ''} value={cart.length}/>
        </div>
    );
}