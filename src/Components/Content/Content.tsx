import routes from '@/routes';
import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import Products from '@/Components/Pages/Products/products';
import LazyOrders from '@/Components/Pages/Orders/orders.lazy';
import ProductItem from '@/Components/Pages/ProductItem/productItem';

export default function Content() {

    return (
        <Routes>
            <Route path={ routes.products() } element={ <Products/> }></Route>
            <Route path={ routes.orders() } element={ <Suspense fallback={'loading...'}><LazyOrders/></Suspense> }></Route>
            <Route path={ '/*' } element={ <h2>not found</h2> }></Route>
            <Route path={ `${routes.product()}/:id` } element={ <ProductItem/> }></Route>
        </Routes>
    );
}