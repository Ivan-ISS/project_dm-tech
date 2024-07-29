import * as styles from './secondaryButton.module.scss';
import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    text?: number | string;
    edges?: 'rounded' | 'leftRounded' | 'rightRounded'
    isActive?: boolean;
    isDisabled?: boolean;
    children?: JSX.Element;
}

export default function Button({ text, edges, isActive, isDisabled, children, ...props }: ButtonProps) {

    const handleClickBtn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (props.onClick) {
            props.onClick(e);
        }
    };

    return (
        <button
            {...props}
            onClick={handleClickBtn}
            className={`
                ${styles.button}
                ${text === '...' ? styles.blank : null}
                ${edges && styles[edges]}
                ${isActive ? styles.active : null}
                ${isDisabled ? styles.disabled : null}
            `}
            disabled={isDisabled}
        >
            {!text && children}
            {!children && <div className={styles.text}>{text}</div>}
        </button>
    );
}