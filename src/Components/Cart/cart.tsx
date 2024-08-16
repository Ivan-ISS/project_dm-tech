import * as styles from './cart.module.scss';
import { HTMLAttributes } from 'react';
import { useAppSelector } from '@/redux/store';
import { selectCart } from '@/redux/slices/cartSlice/cartSelector';
import IconButton from '../Common/Buttons/IconButton/iconButton';
import useScreenSize from '@/hooks/useScreenSize';

export interface CartProps extends HTMLAttributes<HTMLDivElement>{}

export default function Cart({ ...props }: CartProps) {
    const cart = useAppSelector(selectCart);
    const [ screenWidth ] = useScreenSize();

    return (
        <div { ...props } className={styles.cart}>
            <IconButton
                iconName={'cart'}
                text={screenWidth > 560 ? 'Корзина' : ''}
                value={cart.length}
            />
        </div>
    );
}