import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
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
    title: 'product',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
];

export default navConfig;
