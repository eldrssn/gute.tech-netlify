import React, { useContext, useState } from 'react';
import classnames from 'classnames/bind';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

import { ModalAdvice } from 'components/main/ModalAdvice';
import { selectShowcaseData } from 'store/reducers/showcase/selectors';
import { selectOrderTotal, selectCart } from 'store/reducers/cart/selectors';
import { useWindowSize } from 'hooks/useWindowSize';
import { HIDE_PHONE_WIDTH } from 'constants/variables';
import { formatPrice } from 'utility/helpers';

import { HeaderContext } from '../HeaderContext';
import styles from './headerAsideNav.module.scss';
import { HeaderAsideNavProps } from './types';

const cn = classnames.bind(styles);

const HeaderAsideNav: React.FC<HeaderAsideNavProps> = ({ isDrawer }) => {
  const { isFullHeader, isMobileView, isFocusSearchField } =
    useContext(HeaderContext);
  const [isOpenModalAdvice, setIsOpenModalAdvice] = useState(false);
  const { windowWidth } = useWindowSize();

  const { phone } = useSelector(selectShowcaseData);
  const orderTotal = useSelector(selectOrderTotal);
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
      {(isFullHeader || isMobileView || isDrawer) && !hidePhone && (
        <MenuItem disableGutters sx={{ display: 'flex' }}>
          <i className={styles.icon_phone} />
          <a href='tel:+74992832026' className={menuItemStyles}>
            {phone}
          </a>
        </MenuItem>
      )}

      <Box
        className={styles.menuItemsBox}
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
        {(!isMobileView || !isDrawer) && (
          <Link href={'/cart'} passHref>
            <MenuItem>
              <Box className={styles.shoppingCartIcon}>
                <Box className={styles.shoppingCart} />
                <Box component='div' className={styles.countCartItem}>
                  {amountCartItems}
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
          disableGutters
          onClick={() => setIsOpenModalAdvice(true)}
        >
          <Box className={styles.consiltIcon} />
          {(isFullHeader || isDrawer) && (
            <Typography className={menuItemStyles}>Консультация</Typography>
          )}
        </MenuItem>
      </Box>
    </>
  );
};

export { HeaderAsideNav };
