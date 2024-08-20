import routes from '@/routes';
import {
    INavigationItems,
    ILoadParams,
    ITextData,
    IResultValidateCart,
    IFormFields,
    ISelectFields,
    IFilters,
} from './types/dataTypes';

// Данные навигации
export const navigationItems: INavigationItems[] = [
    { fieldName: 'Товары', pathName: routes.products() },
    { fieldName: 'Заказы', pathName: routes.orders() },
];

// Текстовые данные
export const textData: ITextData = {
    productDetailedCard: [
        'Обменять или вернуть товар надлежащего качества можно в течение 14 дней с момента покупки.',
        'Цены в интернет-магазине могут отличаться от розничных магазинов.',
    ],
};

// Поля формы поиска
export const searchInputs: IFormFields[] = [
    { labelName: 'Название', type: 'text', fieldName: 'search', placeholder: 'Название' },
    { labelName: 'Цена от', type: 'number', fieldName: 'priceFrom', placeholder: 'Цена от' },
    { labelName: 'Цена до', type: 'number', fieldName: 'priceTo', placeholder: 'Цена до' },
    { labelName: 'Рейтинг от', type: 'number', fieldName: 'ratingFrom', placeholder: 'Рейтинг от' },
    { labelName: 'Рейтинг до', type: 'number', fieldName: 'ratingTo', placeholder: 'Рейтинг до' },
];

export const searchSelects: ISelectFields[] = [
    { labelName: 'Сортировать', fieldName: 'sort', multiple: false },
    { labelName: 'Категория', fieldName: 'categoryNames', multiple: true },
];

// Изначальное состояние валидации
export const defaultStateValid: IResultValidateCart = {
    minPrice: {
        isValid: true,
        error: '',
    },
    maxPrice: {
        isValid: true,
        error: '',
    },
    warnQuantity: {
        isWarning: true,
        warning: '',
        productId: [''],
    },
    maxQuantity: {
        isValid: true,
        error: '',
        productId: [''],
    },
};

// Начальные данные загрузки товаров и заказов
export const productsLoadParams: ILoadParams = {
    firstPage: 1,
    limit: 15,
};

export const defaultFilters: IFilters = {
    search: '',
    sort: '',
    categoryNames: [''],
    priceFrom: '',
    priceTo: '',
    ratingFrom: '',
    ratingTo: '',
};

export const ordersLoadParams: ILoadParams = {
    firstPage: 1,
    limit: 15,
};
