import { BasketIcon } from 'components/ui/BasketIcon';
import { CatalogIcon } from 'components/ui/CatalogIcon';
import { HomeIcon } from 'components/ui/HomeIcon';
import { UserIcon } from 'components/ui/UserIcon';

enum MenuTittles {
  HOME = 'Главная',
  CATALOG = 'Каталог',
  CART = 'Корзина',
  PROFILE = 'Профиль',
}

const menuLinks = [
  {
    title: MenuTittles.HOME,
    href: '/',
    icon: HomeIcon,
  },
  {
    title: MenuTittles.CATALOG,
    href: '/catalog',

    icon: CatalogIcon,
  },
  {
    title: MenuTittles.CART,
    href: '/cart',

    icon: BasketIcon,
  },
  {
    title: MenuTittles.PROFILE,
    href: '/profile',

    icon: UserIcon,
  },
];

export { MenuTittles, menuLinks };
