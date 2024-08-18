import * as styles from './secondaryButton.module.scss';
import { ButtonHTMLAttributes } from 'react';

export interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text?: number | string;
    segment?: 'counter';
    edges?: 'rounded' | 'leftRounded' | 'rightRounded';
    adaptive: boolean;
    isActive?: boolean;
    isDisabled?: boolean;
    children?: JSX.Element;
}

export default function SecondaryButton({
    text,
    segment,
    edges,
    adaptive,
    isActive,
    isDisabled,
    children,
    ...props
}: SecondaryButtonProps) {
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
                ${segment ? styles.segmentCounter : null}
                ${edges && styles[edges]}
                ${adaptive ? styles.buttonAdaptive : null}
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
