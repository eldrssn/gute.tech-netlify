import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { PagesTypes, PagesType } from './types';

export const pages = [
  PagesTypes.phone,
  PagesTypes.callback,
  PagesTypes.shoppingCart,
];

export const menuIcons = {
  [PagesTypes.phone]: PhoneCallbackIcon,
  [PagesTypes.callback]: HeadphonesIcon,
  [PagesTypes.shoppingCart]: ShoppingCartIcon,
};

export const menuItemNames: Record<PagesType, string> = {
  [PagesTypes.phone]: '(499) 283-20-26',
  [PagesTypes.callback]: 'Консультация',
  [PagesTypes.shoppingCart]: '0',
};
