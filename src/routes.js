import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ErrorPageLayout from './layouts/error';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import AdminDashboardLayout from './layouts/dashboard/admin';
import AdminDashboard from './pages/admin/Dashboard';
import AdminGoldRate from './pages/admin/GoldRate';
import AdminBranch from './pages/admin/Branch';
import AdminUser from './pages/admin/User';
import AdminFund from './pages/admin/Fund';
import AdminExpense from './pages/admin/Expense';
import AdminLeave from './pages/admin/Leave';
import AdminAttendance from './pages/admin/Attendance';
import AdminEmployee from './pages/admin/Employee';
import HrDashboardLayout from './layouts/dashboard/hr';
import HrDashboard from './pages/hr/Dashboard';
import HrBranch from './pages/hr/Branch';
import HrUser from './pages/hr/User';
import HrLeave from './pages/hr/Leave';
import HrAttendance from './pages/hr/Attendance';
import HrEmployee from './pages/hr/Employee';

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
          <AdminDashboardLayout />
        </Protected>
      ),
      children: [
        { element: <Navigate to="/admin/dashboard" />, index: true },
        { path: 'dashboard', element: <AdminDashboard /> },
        { path: 'gold-rate', element: <AdminGoldRate /> },
        { path: 'branch', element: <AdminBranch /> },
        { path: 'user', element: <AdminUser /> },
        { path: 'fund', element: <AdminFund /> },
        { path: 'expense', element: <AdminExpense /> },
        { path: 'leave', element: <AdminLeave /> },
        { path: 'attendance', element: <AdminAttendance /> },
        { path: 'employee', element: <AdminEmployee /> },
      ],
    },
    {
      path: '/hr',
      element: (
        <Protected>
          <HrDashboardLayout />
        </Protected>
      ),
      children: [
        { element: <Navigate to="/hr/dashboard" />, index: true },
        { path: 'dashboard', element: <HrDashboard /> },
        { path: 'branch', element: <HrBranch /> },
        { path: 'user', element: <HrUser /> },
        { path: 'leave', element: <HrLeave /> },
        { path: 'attendance', element: <HrAttendance /> },
        { path: 'employee', element: <HrEmployee /> },
      ],
    },
    {
      path: '/',
      element: <Navigate to="/login" replace />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      element: <ErrorPageLayout />,
      children: [
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
