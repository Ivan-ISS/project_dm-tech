import * as styles from './counterInput.module.scss';
import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    value: number;
    isDisabled?: boolean;
    handleChangeInput: (count: number) => void;
}

export default function CounterInput({ value, isDisabled, handleChangeInput, ...props }: InputProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseFloat(event.target.value);
        if (value < 0 || event.target.value === '') {
            value = 0;
        }
        handleChangeInput(value);
    };

    return (
        <div className={styles.counterInput}>
            <input
                {...props}
                className={`
                    ${styles.input}
                    ${isDisabled ? styles.disabled : null}
                `}
                type={'number'}
                value={value}
                disabled={isDisabled}
                onChange={ (event) => handleChange(event) }
            />
        </div>
    );
}