import React, { FC, useContext, useState } from 'react';
import classnames from 'classnames/bind';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

import { ModalAdvice } from 'components/main/ModalAdvice';
import { selectShowcaseData } from 'store/reducers/showcase/selectors';
import {
  selectCartOrderTotal,
  selectCart,
} from 'store/reducers/cart/selectors';
import { useWindowSize } from 'hooks/useWindowSize';
import { HIDE_PHONE_WIDTH } from 'constants/variables';
import { formatPrice } from 'utility/helpers';

import { HeaderContext } from '../HeaderContext';
import { LoginButton } from '../LoginButton';

import styles from './headerAsideNav.module.scss';

const cn = classnames.bind(styles);

const HeaderAsideNav: FC = () => {
  const { isFullHeader, isMobileView, isFocusSearchField } =
    useContext(HeaderContext);
  const [isOpenModalAdvice, setIsOpenModalAdvice] = useState(false);
  const { windowWidth } = useWindowSize();

  const { phone } = useSelector(selectShowcaseData);
  const orderTotal = useSelector(selectCartOrderTotal);
  const cart = useSelector(selectCart);

  const amountCartItems = cart.length;

  const menuItemStyles = cn(styles.menuItem, {
    [styles.menuItem_mobile]: isMobileView,
  });

  const windowSize = windowWidth ? windowWidth : 0;
  const hidePhone = isFocusSearchField && windowSize < HIDE_PHONE_WIDTH;

  const formattedOrderTotal = formatPrice(orderTotal);

  return (
    <>
      <ModalAdvice
        isOpen={isOpenModalAdvice}
        setIsOpen={setIsOpenModalAdvice}
      />
      {(isFullHeader || isMobileView) && !hidePhone && (
        <MenuItem disableGutters>
          <i className={styles.icon_phone} />
          <a
            href='tel:+74992832026'
            className={cn(menuItemStyles, styles.menuItem_phone)}
          >
            {phone}
          </a>
        </MenuItem>
      )}

      <Box
        className={styles.menuItemsBox}
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
        {!isMobileView && (
          <Link href={'/cart'} passHref>
            <MenuItem disableGutters>
              <Box className={styles.shoppingCartIcon}>
                <Box className={styles.shoppingCart} />
                <Box component='div' className={styles.countCartItem}>
                  <span className={styles.countCartItem_number}>
                    {amountCartItems}
                  </span>
                </Box>
                <Typography className={styles.orderTotalCard}>
                  {formattedOrderTotal}
                  <i className={styles.icon_ruble} />
                </Typography>
              </Box>
            </MenuItem>
          </Link>
        )}

        <MenuItem
          className={styles.menuItem_callback}
          disableGutters={!isFullHeader}
          onClick={() => setIsOpenModalAdvice(true)}
        >
          <Box className={styles.consiltIcon} />
          {isFullHeader && (
            <Typography className={menuItemStyles}>Консультация</Typography>
          )}
        </MenuItem>
        <LoginButton />
      </Box>
    </>
  );
};

export { HeaderAsideNav };
