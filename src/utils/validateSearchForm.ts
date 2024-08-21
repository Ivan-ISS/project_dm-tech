import { IFilters } from '@/types/dataTypes';

export default function validateSearchForm(formData: IFilters): boolean {
    return Object.values(formData).every(
        (value) =>
            value === undefined ||
            value === null ||
            (Array.isArray(value) && value.length === 0) ||
            (typeof value === 'string' && value.trim() === '') ||
            (typeof value === 'number' && isNaN(value))
    );
}
