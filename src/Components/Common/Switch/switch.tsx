import * as styles from './switch.module.scss';
import { useState, HTMLAttributes } from 'react';

export interface SwitchProps extends HTMLAttributes<HTMLInputElement> {
    isActive: boolean;
    label?: string;
}

export default function Switch({ isActive, label, ...props }: SwitchProps) {
    const [isChecked, setIsChecked] = useState(isActive);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };

    return (
        <div>
            <label className={styles.switch}>
                <input { ...props } className={styles.input} type={'checkbox'} checked={isChecked} onChange={handleChange}/>
                <span className={styles.slider}></span>
            </label>
            {label && ' - ' + label}
        </div>
    );
}