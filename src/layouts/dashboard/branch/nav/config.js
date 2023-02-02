import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// component
import SvgColor from '../../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/branch/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'funds',
    path: '/branch/fund',
    icon: <AttachMoneyIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: 'expenses',
    path: '/branch/expense',
    icon: <RequestQuoteIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: 'Leave',
    path: '/branch/leave',
    icon: <DescriptionIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: 'Attendance',
    path: '/branch/attendance',
    icon: <AccessTimeIcon sx={{ width: 1, height: 1 }} />,
  },
];

export default navConfig;
