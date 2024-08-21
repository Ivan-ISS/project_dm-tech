import * as styles from './searchForm.module.scss';
import { IFilters as IFormData } from '@/types/dataTypes';
import { searchInputs, searchSelects } from '@/data';
import { useState, useEffect, FormEvent } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { resetProducts } from '@/redux/slices/productsSlice/productsSlice';
import { selectSortFields } from '@/redux/slices/productsSlice/productsSelector';
import { applyFilters, resetFilters } from '@/redux/slices/filtersSlice/filtersSlice';
import { selectFilters } from '@/redux/slices/filtersSlice/filtersSelector';
import { selectCategories } from '@/redux/slices/categoriesSlice/categoriesSelector';
import validateSearchForm from '@/utils/validateSearchForm';
import DefaultInput from '../../../Common/Input/DefaultInput/defaultInput';
import Select from '../../../Common/Select/select';
import PrimaryButton from '../../../Common/Buttons/PrimaryButton/primaryButton';

export default function SearchForm() {
    const dispatch = useAppDispatch();
    const sortFields = useAppSelector(selectSortFields);
    const categories = useAppSelector(selectCategories);
    const filters = useAppSelector(selectFilters);
    const [formData, setFormData] = useState<IFormData>(filters);
    const [isReSubmit, setIsReSubmit] = useState<boolean>(false);
    // isReSubmit... - для исключения холостых нажатий на кнопки формы

    useEffect(() => {
        if (filters) {
            setFormData(filters);
        }
    }, [filters]);

    useEffect(() => {
        setIsReSubmit(false);
    }, [formData]);

    const handleChange = (fieldName: string, value: string | string[]) => {
        setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isReSubmit) {
            dispatch(resetProducts());
            dispatch(applyFilters(formData));
            setIsReSubmit(true);
        }
    };

    const handleReset = () => {
        dispatch(resetProducts());
        dispatch(resetFilters());
        setFormData(filters);
    };

    return (
        <form className={styles.searchFrom} onSubmit={handleSubmit}>
            <div className={styles.inputFields}>
                {searchInputs.map((field, index) => (
                    <div key={index} className={styles.elDefaultInput}>
                        <DefaultInput
                            name={field.fieldName}
                            type={field.type}
                            value={formData[field.fieldName as keyof typeof formData] || ''}
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
                            currentValue={formData[field.fieldName as keyof typeof formData]}
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
                    <PrimaryButton
                        text={'Найти'}
                        type={'submit'}
                        isDisabled={validateSearchForm(formData)}
                        isDisabledStyles={true}
                    />
                </div>
                <div className={styles.elButton}>
                    <PrimaryButton
                        text={'Сбросить фильтры'}
                        type={'reset'}
                        onClick={handleReset}
                        isDisabled={validateSearchForm(filters)}
                        /* isDisabledStyles={true} */
                    />
                </div>
            </div>
        </form>
    );
}
