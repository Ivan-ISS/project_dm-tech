import * as styles from './cart.module.scss';
import { useState, useEffect, HTMLAttributes } from 'react';
import { useAppSelector } from '@/redux/store';
import { selectCart } from '@/redux/slices/cartSlice/cartSelector';
import useScreenSize from '@/hooks/useScreenSize';
import useCloseOut from '@/hooks/useCloseOut';
import IconButton from '../Common/Buttons/IconButton/iconButton';
import CartWidget from '../CartWidget/cartWidget';

export interface CartProps extends HTMLAttributes<HTMLDivElement> {}

export default function Cart({ ...props }: CartProps) {
    const cart = useAppSelector(selectCart);
    const [show, setShow] = useState<boolean>(false);
    const [screenWidth] = useScreenSize();
    const { isOpen, handleClick, targetElement } = useCloseOut();

    useEffect(() => {
        if (isOpen) {
            setShow(true);
        } else {
            setTimeout(() => setShow(false), 300);
        }
    }, [isOpen]);

    return (
        <div ref={targetElement} {...props} className={styles.wrapCart}>
            <div className={styles.cart}>
                <IconButton
                    iconName={'cart'}
                    text={screenWidth > 560 ? 'Корзина' : ''}
                    value={cart.length}
                    onClick={handleClick}
                />
            </div>
            <div className={`${styles.insert} ${isOpen ? styles.insertShow : null}`}>
                {show && <CartWidget handleClickWidget={handleClick} />}
            </div>
        </div>
    );
}
