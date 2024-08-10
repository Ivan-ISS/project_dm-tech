import * as styles from './closeButton.module.scss';
import { HTMLAttributes } from 'react';

export interface CloseButtonProps extends HTMLAttributes<HTMLButtonElement>{
    show: boolean;
}

export default function CloseButton({ show, ...props }: CloseButtonProps) {

    return (
        <button {...props} className={`${styles.closeButton} ${show ? styles.closeButtonShow : null}`}></button>
    );
}