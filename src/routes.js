import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import GoldRate from './pages/GoldRate';

// ----------------------------------------------------------------------

function Protected({ children }) {
  const auth = useSelector((state) => state.auth);
  if (auth.isAuthenticated !== true) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

Protected.propTypes = {
  children: PropTypes.any,
};

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: (
        <Protected>
          <DashboardLayout />
        </Protected>
      ),
      children: [
        { element: <Navigate to="/dashboard/home" />, index: true },
        { path: 'home', element: <DashboardAppPage /> },
        { path: 'gold-rate', element: <GoldRate /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/home" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
