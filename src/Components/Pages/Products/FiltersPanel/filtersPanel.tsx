import * as styles from './filtersPanel.module.scss';
import { useState } from 'react';
import SearchForm from '../SearchForm/searchForm';

export default function FiltersPanel() {
    const [show, setShow] = useState<boolean>(false);

    const handleClickLabel = () => {
        setShow((v) => !v);
    };

    return (
        <div className={styles.filtersPanel}>
            <div
                className={`${styles.label} ${show && styles.labelShow}`}
                onClick={handleClickLabel}
            >
                {!show ? 'Показать фильтры' : 'Спрятать фильтры'}
            </div>
            {show && (
                <div className={styles.elSearchForm}>
                    <SearchForm />
                </div>
            )}
        </div>
    );
}
