import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import {LazyShop} from '../Pages/Shop/Shop.lazy';
import {LazyAbout} from '../Pages/About/About.lazy';

export default function Content() {

    return (
        <Routes>
            <Route path={ '/about' } element={<Suspense fallback={'loading...'}><LazyAbout /></Suspense>}></Route>
            <Route path={ '/shop' } element={<Suspense fallback={'loading...'}><LazyShop /></Suspense>}></Route>
        </Routes>
    );
}