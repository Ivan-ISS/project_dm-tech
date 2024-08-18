import * as styles from './iconButton.module.scss';
import { HTMLAttributes } from 'react';
import Trash from '@/assets/images/svg/trash.svg';
import ArrowLeft from '@/assets/images/svg/arrowLeft.svg';
import ArrowUndo from '@/assets/images/svg/arrowUndo.svg';
import Cart from '@/assets/images/svg/cart.svg';
import Item from '../../Item/item';

export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
    iconName: 'trash' | 'arrowLeft' | 'arrowUndo' | 'cart';
    text: string;
    value?: number;
}

export default function IconButton({ iconName, text, value, ...props }: IconButtonProps) {
    return (
        <button {...props} className={` ${styles.iconButton} ${styles[iconName + 'Wrap']} `}>
            {iconName === 'trash' && <Trash className={` ${styles.icon} ${styles[iconName]} `} />}
            {iconName === 'arrowLeft' && (
                <ArrowLeft className={` ${styles.icon} ${styles[iconName]} `} />
            )}
            {iconName === 'arrowUndo' && (
                <ArrowUndo className={` ${styles.icon} ${styles[iconName]} `} />
            )}
            {iconName === 'cart' && <Cart className={` ${styles.icon} ${styles[iconName]} `} />}
            <Item text={text} value={value} />
        </button>
    );
}
