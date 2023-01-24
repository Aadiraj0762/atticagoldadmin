import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import GoldRate from './pages/GoldRate';
import Branch from './pages/Branch';
import User from './pages/User';
import Fund from './pages/Fund';
import Expense from './pages/Expense';
import Leave from './pages/Leave';
import Attendance from './pages/Attendance';

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
        { path: 'branch', element: <Branch /> },
        { path: 'user', element: <User /> },
        { path: 'fund', element: <Fund /> },
        { path: 'expense', element: <Expense /> },
        { path: 'leave', element: <Leave /> },
        { path: 'attendance', element: <Attendance /> },
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
