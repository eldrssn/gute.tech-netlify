import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

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
    icon: faHouse,
  },
  {
    title: MenuTittles.CATALOG,
    href: '/catalog',
    icon: faListUl,
  },
  {
    title: MenuTittles.CART,
    href: '/cart',
    icon: faCartShopping,
  },
  {
    title: MenuTittles.PROFILE,
    href: '/profile',
    icon: faCircleUser,
  },
];

export { MenuTittles, menuLinks };
