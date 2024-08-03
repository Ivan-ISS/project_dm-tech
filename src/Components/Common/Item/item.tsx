import * as styles from './item.module.scss';
import { HTMLAttributes } from 'react';

export interface ItemProps extends HTMLAttributes<HTMLDivElement> {
    text: string;
    value?: number;
    isActive?: boolean;
    interactive?: boolean;
}

export default function Item({ text, value, isActive, interactive, ...props }: ItemProps) {

    return (
        <div 
            {...props}
            className={`
                ${styles.item}
                ${isActive && styles.active}
                ${interactive && styles.interactive}
            `}
        >
            <>
                {text}{value ? ` (${value})` : ''}
            </>
        </div>
    );
}