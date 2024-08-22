import * as styles from './select.module.scss';
import { HTMLAttributes } from 'react';
import translateSort from '@/utils/translateSort';

export interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
    name: string;
    values: string[];
    multiple: boolean;
    placeholder?: string;
    currentValue?: string | number | string[];
    handleSelect: (value: string | string[]) => void;
}

export default function Select({
    name,
    values,
    currentValue,
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
                value={currentValue}
                onChange={handleChange}
            >
                <option value={''}>{placeholder}</option>
                {values.map((value, index) => (
                    <option key={index} value={value}>
                        {multiple && index + 1}
                        {multiple && '. '}
                        {translateSort(value).charAt(0).toUpperCase() +
                            translateSort(value).slice(1).toLowerCase()}
                    </option>
                ))}
            </select>
        </div>
    );
}
