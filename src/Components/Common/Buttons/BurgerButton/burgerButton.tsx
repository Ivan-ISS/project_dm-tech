import * as styles from './burgerButton.module.scss';
import { useState, useEffect, ButtonHTMLAttributes } from 'react';
import useCloseOut from '@/hooks/useCloseOut';

export interface BurgerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: JSX.Element;
}

export default function BurgerButton({ children, ...props }: BurgerButtonProps) {
    const [show, setShow] = useState<boolean>(false);
    const {
        isOpen: menuOpen,
        handleClick: handleClickBtn,
        targetElement: burgerButton,
    } = useCloseOut();

    useEffect(() => {
        if (menuOpen) {
            setShow(true);
        } else {
            setTimeout(() => setShow(false), 300); // Для плавного ичезновения (чтобы стили успели отработать)
        }
    }, [menuOpen]);

    return (
        <div ref={burgerButton} className={styles.burgerWrap}>
            <button
                {...props}
                className={`${styles.burgerButton} ${menuOpen ? styles.active : styles.inactive}`}
                onClick={handleClickBtn}
            >
                <span className={styles.band}></span>
                <span className={styles.band}></span>
                <span className={styles.band}></span>
            </button>
            <div className={`${styles.insert} ${menuOpen ? styles.insertShow : null}`}>
                {show && children}
            </div>
        </div>
    );
}
