import * as styles from './primaryButton.module.scss';
import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    text?: number | string;
    isActive?: boolean;
    isDisabled?: boolean;
}

export default function Button({ text, isActive, isDisabled, ...props }: ButtonProps) {

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
                ${isActive ? styles.active : null}
                ${isDisabled ? styles.disabled : null}
            `}
            disabled={isDisabled}
        >
            <div>{text}</div>
        </button>
    );
}