import routes from '@/routes';
import {
    INavigationItems,
    ILoadParams,
} from './types/dataTypes';

// Данные навигации
export const navigationItems: INavigationItems[] = [
    { fieldName: 'Товары', pathName: routes.products() },
    { fieldName: 'Заказы', pathName: routes.orders() },
];

// Начальные данные загрузки товаров и заказов
export const productsLoadParams: ILoadParams = {
    firstPage: 1,
    limit: 15,
};

export const ordersLoadParams: ILoadParams = {
    firstPage: 1,
    limit: 15,
};