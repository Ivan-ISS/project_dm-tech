import * as styles from './primaryButton.module.scss';
import { ButtonHTMLAttributes } from 'react';

export interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text?: number | string;
    isActive?: boolean;
    isDisabled?: boolean;
    isDisabledStyles?: boolean;
}

export default function PrimaryButton({
    text,
    isActive,
    isDisabled,
    isDisabledStyles,
    ...props
}: PrimaryButtonProps) {
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
                ${isDisabled && !isDisabledStyles ? styles.disabled : null}
            `}
            disabled={isDisabled}
        >
            <div>{text}</div>
        </button>
    );
}
