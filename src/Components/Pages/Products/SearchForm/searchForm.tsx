import * as styles from './searchForm.module.scss';
import { IFilters as IFormData } from '@/types/dataTypes';
import { searchInputs, searchSelects, defaultFilters } from '@/data';
import { useState, useEffect, FormEvent } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { resetProducts } from '@/redux/slices/productsSlice/productsSlice';
import { selectSortFields } from '@/redux/slices/productsSlice/productsSelector';
import { applyFilters, resetFilters } from '@/redux/slices/filtersSlice/filtersSlice';
import { selectCategories } from '@/redux/slices/categoriesSlice/categoriesSelector';
import DefaultInput from '../../../Common/Input/DefaultInput/defaultInput';
import Select from '../../../Common/Select/select';
import PrimaryButton from '../../../Common/Buttons/PrimaryButton/primaryButton';

export default function SearchForm() {
    const dispatch = useAppDispatch();
    const sortFields = useAppSelector(selectSortFields);
    const categories = useAppSelector(selectCategories);
    const [formData, setFormData] = useState<IFormData>(defaultFilters);
    const [isRePress, setIsRePress] = useState<boolean>(false);
    // isRePress - для исключения холостых нажатий на кнопки формы

    useEffect(() => {
        setFormData(defaultFilters);
    }, []);

    useEffect(() => {
        setIsRePress(false);
    }, [formData]);

    const handleChange = (fieldName: string, value: string | string[]) => {
        setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isRePress) {
            dispatch(resetProducts());
            dispatch(applyFilters(formData));
            setIsRePress(true);
        }
    };

    const handleReset = () => {
        if (isRePress) {
            dispatch(resetProducts());
            dispatch(resetFilters());
            setFormData(defaultFilters);
            setIsRePress(false);
        }
    };

    return (
        <form className={styles.searchFrom} onSubmit={handleSubmit}>
            <div className={styles.inputFields}>
                {searchInputs.map((field, index) => (
                    <div key={index} className={styles.elDefaultInput}>
                        <DefaultInput
                            name={field.fieldName}
                            type={field.type}
                            value={
                                formData ? formData[field.fieldName as keyof typeof formData] : ''
                            }
                            placeholder={field.placeholder}
                            handleInput={(value) => handleChange(field.fieldName, value)}
                        />
                    </div>
                ))}
            </div>
            <div className={styles.selectFields}>
                {searchSelects.map((field, index) => (
                    <div key={index} className={styles.elSelect}>
                        <Select
                            name={field.fieldName}
                            values={field.fieldName === 'sort' ? sortFields : categories}
                            multiple={field.multiple}
                            placeholder={
                                field.fieldName === 'sort'
                                    ? 'Сортировать по:'
                                    : 'Выбрать категории:'
                            }
                            handleSelect={(value) => handleChange(field.fieldName, value)}
                        />
                    </div>
                ))}
            </div>
            <div className={styles.buttonPanel}>
                <div className={styles.elButton}>
                    <PrimaryButton text={'Найти'} type={'submit'} />
                </div>
                <div className={styles.elButton}>
                    <PrimaryButton text={'Сбросить фильтры'} type={'reset'} onClick={handleReset} />
                </div>
            </div>
        </form>
    );
}
