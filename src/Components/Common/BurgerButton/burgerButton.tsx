import * as styles from './burgerButton.module.scss';
import { ButtonHTMLAttributes } from 'react';
import useCloseOut from '@/hooks/useCloseOut';

export interface BurgerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: JSX.Element;
}

export default function BurgerButton({ children, ...props }: BurgerButtonProps) {
    const { 
        isOpen: menuOpen, 
        handleClick: handleClickBtn, 
        targetElement: burgerButton 
    } = useCloseOut();

    return (
        <div ref={burgerButton} className={styles.burgerWrap}>
            <button {...props} className={`${styles.burgerButton} ${menuOpen ? styles.active : styles.inactive}`} onClick={handleClickBtn}>
                <span className={styles.band}></span>
                <span className={styles.band}></span>
                <span className={styles.band}></span>
            </button>
            { menuOpen && children }
        </div>
    );
}