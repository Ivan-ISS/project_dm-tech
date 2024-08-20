import * as styles from './select.module.scss';
import { HTMLAttributes } from 'react';

export interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
    name: string;
    values: string[];
    multiple: boolean;
    placeholder?: string;
    handleSelect: (value: string | string[]) => void;
}

export default function Select({
    name,
    values,
    multiple,
    placeholder,
    handleSelect,
    ...props
}: SelectProps) {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (multiple) {
            const selectedValues = Array.from(event.target.selectedOptions).map(
                (option) => option.value
            );
            handleSelect(selectedValues);
        } else {
            handleSelect(event.target.value);
        }
    };

    return (
        <div
            className={`
                ${styles.selectWrap}
                ${!multiple && styles.notMultiple}
                ${multiple && styles.multiple}
            `}
        >
            <select
                {...props}
                className={styles.select}
                id={name}
                multiple={multiple}
                onChange={handleChange}
            >
                <option value={''}>{placeholder}</option>
                {values.map((value, index) => (
                    <option key={index} value={value}>
                        {value.toLocaleLowerCase()}
                    </option>
                ))}
            </select>
        </div>
    );
}
