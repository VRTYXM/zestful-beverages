import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';

import FullProductSkeleton from './pages/FullProduct/Skeleton';
import CartSkeleton from './pages/Cart/Skeleton';

import './scss/app.scss';
import MainLayout from './layouts/MainLayout';

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart/Cart'));
const FullProduct = lazy(
  () => import(/* webpackChunkName: "FullProduct" */ './pages/FullProduct/FullProduct'),
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="product/:id"
          element={
            <Suspense fallback={<FullProductSkeleton />}>
              <FullProduct />
            </Suspense>
          }
        />
        <Route
          path="cart"
          element={
            <Suspense fallback={<CartSkeleton />}>
              <Cart />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
