import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/home',
    icon: icon('ic_analytics'),
  },
  {
    title: 'gold-rate',
    path: '/dashboard/gold-rate',
    icon: <MonetizationOnIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: 'branch',
    path: '/dashboard/branch',
    icon: <HomeWorkIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'funds',
    path: '/dashboard/fund',
    icon: <AttachMoneyIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: 'expenses',
    path: '/dashboard/expense',
    icon: <RequestQuoteIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: 'Leave',
    path: '/dashboard/leave',
    icon: <DescriptionIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: 'Attendance',
    path: '/dashboard/attendance',
    icon: <AccessTimeIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: 'Employee',
    path: '/dashboard/employee',
    icon: icon('ic_user'),
  },
];

export default navConfig;
