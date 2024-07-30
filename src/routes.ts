export const BASE_URL = 'https://skillfactory-task.detmir.team';

interface IRoutes {
    products: () => string;
    product: () => string;
    orders: () => string;
    urlProducts: () => string;
}

const routes: IRoutes = {
    products: () => '/',
    product: () => '/product',
    orders: () => '/orders',
    urlProducts: () => `${BASE_URL}/products`,
};

export default routes;