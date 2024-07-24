import { lazy } from 'react';

const LazyOrders = lazy(() => import('./orders'));
export default LazyOrders;