import routes from '@/routes';
import {
    INavigationItems,
    ILoadParams,
    ITextData,
} from './types/dataTypes';

// Данные навигации
export const navigationItems: INavigationItems[] = [
    { fieldName: 'Товары', pathName: routes.products() },
    { fieldName: 'Заказы', pathName: routes.orders() },
];

// Текстовые данные
export const textData: ITextData = { 
    productDetailedCard:
        [
            'Обменять или вернуть товар надлежащего качества можно в течение 14 дней с момента покупки.',
            'Цены в интернет-магазине могут отличаться от розничных магазинов.',
        ]
};

// Начальные данные загрузки товаров и заказов
export const productsLoadParams: ILoadParams = {
    firstPage: 1,
    limit: 15,
};

export const ordersLoadParams: ILoadParams = {
    firstPage: 1,
    limit: 15,
};