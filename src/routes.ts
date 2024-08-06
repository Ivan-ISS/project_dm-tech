export const BASE_URL = 'https://skillfactory-task.detmir.team';

interface IRoutes {
    products: () => string;
    product: () => string;
    orders: () => string;
    urlProducts: () => string;
    urlUpdateCart: () => string;
    urlGetCart: () => string;
    urlSubmitCart: () => string;
    urlGetOrders: () => string;
}

const routes: IRoutes = {
    products: () => '/',
    product: () => '/product',
    orders: () => '/orders',
    urlProducts: () => `${BASE_URL}/products`,
    urlUpdateCart: () => `${BASE_URL}/cart/update`,
    urlGetCart: () => `${BASE_URL}/cart`,
    urlSubmitCart: () => `${BASE_URL}/cart/submit`,
    urlGetOrders: () => `${BASE_URL}/orders`,
};

export default routes;