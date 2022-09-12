import React, { FC, KeyboardEvent, useContext, useState } from 'react';
import classnames from 'classnames/bind';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

import { ModalAdvice } from 'components/main/ModalAdvice';
import { selectShowcaseData } from 'store/reducers/showcase/selectors';
import {
  selectCartTotal,
  selectCartProductTotal,
} from 'store/reducers/cart/selectors';
import { useWindowSize } from 'hooks/useWindowSize';
import { HIDE_PHONE_WIDTH } from 'constants/variables';
import { formatPrice } from 'utility/helpers';

import { HeaderContext } from '../HeaderContext';
import { LoginButton } from '../LoginButton';

import styles from './headerAsideNav.module.scss';
import { handleEnterPress } from 'utility/utils';

const cn = classnames.bind(styles);

const HeaderAsideNav: FC = () => {
  const { isFullHeader, isFocusSearchField } = useContext(HeaderContext);
  const [isOpenModalAdvice, setIsOpenModalAdvice] = useState(false);
  const { windowWidth, isMobile } = useWindowSize();

  const { phone } = useSelector(selectShowcaseData);
  const cartTotal = useSelector(selectCartTotal);
  const cartProductTotal = useSelector(selectCartProductTotal);

  const menuItemStyles = cn(styles.menuItem, {
    [styles.menuItem_mobile]: isMobile,
  });

  const windowSize = windowWidth ? windowWidth : 0;
  const hidePhone = isFocusSearchField && windowSize < HIDE_PHONE_WIDTH;

  const formattedCartTotal = formatPrice(cartTotal);

  const handleClickCallback = () => setIsOpenModalAdvice(true);
  const handlePressCallback = (event: KeyboardEvent) =>
    handleEnterPress(event, handleClickCallback);

  return (
    <>
      {isOpenModalAdvice && (
        <ModalAdvice
          isOpen={isOpenModalAdvice}
          setIsOpen={setIsOpenModalAdvice}
        />
      )}
      {(isFullHeader || isMobile) && !hidePhone && (
        <MenuItem disableGutters>
          <i className={styles.icon_phone} />
          <a
            href={`tel:${phone}`}
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
        {!isMobile && (
          <Link href={'/cart'} passHref>
            <a className={styles.focusKeyboard}>
              <MenuItem disableGutters>
                <Box className={styles.shoppingCartIcon}>
                  <Box className={styles.shoppingCart} />
                  <Box component='div' className={styles.countCartItem}>
                    <span className={styles.countCartItem_number}>
                      {cartProductTotal}
                    </span>
                  </Box>
                  <Typography className={styles.orderTotalCard}>
                    {formattedCartTotal}
                    <i className={styles.icon_ruble} />
                  </Typography>
                </Box>
              </MenuItem>
            </a>
          </Link>
        )}

        <MenuItem
          className={styles.menuItem_callback}
          disableGutters={!isFullHeader}
          onClick={handleClickCallback}
          onKeyDown={handlePressCallback}
          tabIndex={0}
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
