import React, { FC, KeyboardEvent, useContext, useState } from 'react';
import classnames from 'classnames/bind';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

import { ModalAdvice } from 'components/main/ModalAdvice';
import { BasketIcon } from 'components/ui/BasketIcon';
import { RubleIcon } from 'components/ui/RubleIcon';
import { selectShowcaseData } from 'store/reducers/showcase/selectors';
import { selectMetrics } from 'store/reducers/showcase/selectors';
import {
  selectCartTotal,
  selectCartProductTotal,
} from 'store/reducers/cart/selectors';
import { useWindowSize } from 'hooks/useWindowSize';
import { HIDE_PHONE_WIDTH } from 'constants/variables';
import { formatPrice } from 'utility/helpers';
import { sendMetrik } from 'utility/utils/metriks';
import { handleEnterPress } from 'utility/utils';

import { HeaderContext } from '../HeaderContext';
import { LoginButton } from '../LoginButton';

import styles from './headerAsideNav.module.scss';

const cn = classnames.bind(styles);

const HeaderAsideNav: FC = () => {
  const { isFullHeader, isFocusSearchField } = useContext(HeaderContext);
  const [isOpenModalAdvice, setIsOpenModalAdvice] = useState(false);
  const { windowWidth, isMobile } = useWindowSize();

  const metrics = useSelector(selectMetrics);

  const { phone } = useSelector(selectShowcaseData);
  const cartTotal = useSelector(selectCartTotal);
  const cartProductTotal = useSelector(selectCartProductTotal);

  const menuItemStyles = cn(styles.menuItem, {
    [styles.menuItem_mobile]: isMobile,
  });

  const windowSize = windowWidth ? windowWidth : 0;
  const hidePhone = isFocusSearchField && windowSize < HIDE_PHONE_WIDTH;

  const formattedCartTotal = formatPrice(cartTotal);

  const handleClickCallback = () => {
    sendMetrik('reachGoal', metrics?.button_global_help, metrics?.metric_id);
    setIsOpenModalAdvice(true);
  };
  const handlePressCallback = (event: KeyboardEvent) => {
    sendMetrik('reachGoal', metrics?.button_global_help, metrics?.metric_id);
    handleEnterPress(event, handleClickCallback);
  };

  return (
    <>
      {isOpenModalAdvice && (
        <ModalAdvice
          isOpen={isOpenModalAdvice}
          setIsOpen={setIsOpenModalAdvice}
        />
      )}
      {(isFullHeader || isMobile) && !hidePhone && (
        <MenuItem disableGutters className={styles.menuOutline}>
          <Image src='/icons/phonev1.png' alt='phone' width='28' height='28' />
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
              <MenuItem className={styles.menuOutline} disableGutters>
                <Box className={styles.shoppingCartIcon}>
                  <BasketIcon className={styles.basketIcon} />
                  <Box component='div' className={styles.countCartItem}>
                    <span className={styles.countCartItem_number}>
                      {cartProductTotal}
                    </span>
                  </Box>
                  <span className={styles.orderTotalCard}>
                    {formattedCartTotal}
                    <RubleIcon className={styles.rubleIcon} />
                  </span>
                </Box>
              </MenuItem>
            </a>
          </Link>
        )}

        <MenuItem
          className={cn(styles.menuItem_callback, styles.menuOutline)}
          disableGutters={!isFullHeader}
          onClick={handleClickCallback}
          onKeyDown={handlePressCallback}
          tabIndex={0}
        >
          <Image
            src='/icons/consultIcon.png'
            width={19}
            height={26}
            alt='consultation icon'
          />
          {isFullHeader && <span className={menuItemStyles}>Консультация</span>}
        </MenuItem>
        <LoginButton />
      </Box>
    </>
  );
};

export { HeaderAsideNav };
