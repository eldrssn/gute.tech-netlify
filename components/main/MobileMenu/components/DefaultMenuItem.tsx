import Link from 'next/link';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { selectCart } from 'store/reducers/cart/selectors';

import { MenuTittles } from '../constants';
import { MenuItemProps } from '../types';

import styles from '../mobileMenu.module.scss';

const cn = classnames.bind(styles);

const DefaultMenuItem: FC<MenuItemProps> = ({ menuItem, router }) => {
  const cart = useSelector(selectCart);
  const amountCartItems = cart.length;

  const { title, href, icon } = menuItem;

  const isHomeItem = title === MenuTittles.HOME;
  const isCartItem = title === MenuTittles.CART && Boolean(amountCartItems);

  const isActive = isHomeItem
    ? router.pathname === href
    : router.pathname.includes(href);

  return (
    <Link href={href} key={title}>
      <a
        className={cn(styles.menuItem, {
          [styles.menuItem_active]: isActive,
        })}
      >
        <FontAwesomeIcon icon={icon} className={styles.menuItem_icon} />
        {isCartItem && (
          <span className={styles.menuItem_cartCounter}>{amountCartItems}</span>
        )}
        <span className={styles.menuItem_title}>{title}</span>
      </a>
    </Link>
  );
};

export { DefaultMenuItem };
