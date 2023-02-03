import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SellIcon from '@mui/icons-material/Sell';
// component
import SvgColor from '../../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/admin/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'gold-rate',
    path: '/admin/gold-rate',
    icon: <MonetizationOnIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: 'branch',
    path: '/admin/branch',
    icon: <HomeWorkIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: 'user',
    path: '/admin/user',
    icon: icon('ic_user'),
  },
  {
    title: 'funds',
    path: '/admin/fund',
    icon: <AttachMoneyIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: 'expenses',
    path: '/admin/expense',
    icon: <RequestQuoteIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: 'Leave',
    path: '/admin/leave',
    icon: <DescriptionIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: 'Attendance',
    path: '/admin/attendance',
    icon: <AccessTimeIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: 'Sale',
    path: '/admin/sale',
    icon: <SellIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: 'Employee',
    path: '/admin/employee',
    icon: icon('ic_user'),
  },
];

export default navConfig;
