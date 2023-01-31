import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import DashboardLayout from './layouts/dashboard/admin';
import ErrorPageLayout from './layouts/error';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import Dashboard from './pages/admin/Dashboard';
import GoldRate from './pages/admin/GoldRate';
import Branch from './pages/admin/Branch';
import User from './pages/admin/User';
import Fund from './pages/admin/Fund';
import Expense from './pages/admin/Expense';
import Leave from './pages/admin/Leave';
import Attendance from './pages/admin/Attendance';
import Employee from './pages/admin/Employee';

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
      path: '/admin',
      element: (
        <Protected>
          <DashboardLayout />
        </Protected>
      ),
      children: [
        { element: <Navigate to="/admin/dashboard" />, index: true },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'gold-rate', element: <GoldRate /> },
        { path: 'branch', element: <Branch /> },
        { path: 'user', element: <User /> },
        { path: 'fund', element: <Fund /> },
        { path: 'expense', element: <Expense /> },
        { path: 'leave', element: <Leave /> },
        { path: 'attendance', element: <Attendance /> },
        { path: 'employee', element: <Employee /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <ErrorPageLayout />,
      children: [
        { element: <Navigate to="/admin/dashboard" />, index: true },
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
