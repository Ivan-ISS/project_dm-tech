import routes from '@/routes';
import {
    INavigationItems,
} from './types/dataTypes';

// Данные навигации
export const navigationItems: INavigationItems[] = [
    { fieldName: 'Товары', pathName: routes.products() },
    { fieldName: 'Заказы', pathName: routes.orders() },
];