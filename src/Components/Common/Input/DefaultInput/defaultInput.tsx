import * as styles from './defaultInput.module.scss';
import { InputHTMLAttributes } from 'react';

export interface DefaultInputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    type: string;
    placeholder?: string;
    isDisabled?: boolean;
    handleInput: (value: string) => void;
}

export default function DefaultInput({
    name,
    type,
    placeholder,
    isDisabled,
    handleInput,
    ...props
}: DefaultInputProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleInput(event.target.value);
    };

    return (
        <div className={styles.defaultInput}>
            <input
                {...props}
                id={name}
                className={`
                    ${styles.input}
                    ${isDisabled ? styles.disabled : null}
                `}
                type={type}
                placeholder={placeholder}
                disabled={isDisabled}
                onChange={handleChange}
            />
        </div>
    );
}
