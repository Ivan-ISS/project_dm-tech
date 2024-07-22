import './styles/styles.scss';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import { Suspense } from 'react';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './Components/App';
// import { LazyAbout } from '@/Components/Pages/About/About.lazy';
// import { LazyShop } from '@/Components/Pages/Shop/Shop.lazy';

const root = document.getElementById('root');

if (!root) {
    throw new Error('root not found');
}

const container = createRoot(root);

/* const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/about',
                element: <Suspense fallback={'loading...'}><LazyAbout /></Suspense>,
            },
            {
                path: '/shop',
                element: <Suspense fallback={'loading...'}><LazyShop /></Suspense>,
            },
        ]
    },
]);

container.render(
    <RouterProvider router={router} />
); */

container.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);