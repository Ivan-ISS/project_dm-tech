import * as styles from './filtersPanel.module.scss';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { changeFiltersPanelShow } from '@/redux/slices/userSlice/userSlice';
import { selectFiltersPanelShow } from '@/redux/slices/userSlice/userSelector';
import SearchForm from '../SearchForm/searchForm';

export default function FiltersPanel() {
    const dispatch = useAppDispatch();
    const show = useAppSelector(selectFiltersPanelShow);

    const handleClickLabel = () => {
        dispatch(changeFiltersPanelShow());
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
