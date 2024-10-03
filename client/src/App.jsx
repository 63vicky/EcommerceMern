import { Route, Routes } from 'react-router-dom';
import AuthLayout from './components/auth/Layout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminLayout from './components/admin-view/layout';
import AdminDashboard from './pages/admin-view/dashboard';
import AdminOrders from './pages/admin-view/orders';
import AdminProducts from './pages/admin-view/products';
import AdminFeatures from './pages/admin-view/features';
import ShoppingLayout from './components/shopping-view/layout';
import NotFound from './pages/not-found';
import ShoppingHome from './pages/shoping-view/home';
import ShoppingListing from './pages/shoping-view/listing';
import ShoppingCheckout from './pages/shoping-view/checkOut';
import ShoppingAccount from './pages/shoping-view/account';
import CheckAuth from './components/common/check-auth';
import UnAuthUser from './pages/unath-page';
import { Toaster } from '@/components/ui/toaster.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './store/auth-slice';
import { Skeleton } from '@/components/ui/skeleton';

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-full h-dvh" />;

  return (
    <>
      <Toaster />
      <div className="flex bg-white flex-col overflow-hidden">
        <Routes>
          <Route
            path="/"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AuthLayout />
              </CheckAuth>
            }
          >
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route
            path="/auth"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AuthLayout />
              </CheckAuth>
            }
          >
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route
            path="/admin"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AdminLayout />
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="features" element={<AdminFeatures />} />
          </Route>

          <Route
            path="/shop"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingLayout />
              </CheckAuth>
            }
          >
            <Route path="home" element={<ShoppingHome />} />
            <Route path="listing" element={<ShoppingListing />} />
            <Route path="checkout" element={<ShoppingCheckout />} />
            <Route path="account" element={<ShoppingAccount />} />
          </Route>

          <Route path="/unauth-page" element={<UnAuthUser />} />

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
