import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { PagesType } from './types';

export const menuIcons = {
  phone: PhoneCallbackIcon,
  callback: HeadphonesIcon,
  shoppingCart: ShoppingCartIcon,
};

export const pages: PagesType[] = ['phone', 'shoppingCart', 'callback'];

export const menuItemNames = {
  phone: '(499) 283-20-26',
  callback: 'Консультация',
  shoppingCart: '0',
};
