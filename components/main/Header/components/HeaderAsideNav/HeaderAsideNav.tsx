import React, { useContext, useState } from 'react';
import classnames from 'classnames/bind';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { IsDrawerProps } from 'components/main/Header/types';
import { ModalAdvice } from 'components/main/ModalAdvice';
import { selectShowcaseData } from 'store/reducers/showcase/selectors';
import { selectOrderTotal } from 'store/reducers/cart/selectors';

import { HeaderContext } from '../HeaderContext';
import styles from './headerAsideNav.module.css';

const cn = classnames.bind(styles);

const HeaderAsideNav: React.FC<IsDrawerProps> = ({ isDrawer }) => {
  const { isFullHeader, isMobileView } = useContext(HeaderContext);
  const [isOpenModalAdvice, setIsOpenModalAdvice] = useState(false);

  const { phone } = useSelector(selectShowcaseData);
  const orderTotal = useSelector(selectOrderTotal);

  const menuItemStyles = cn(styles.menuItem, {
    [styles.menuItem_mobile]: isMobileView,
  });

  return (
    <>
      <ModalAdvice
        isOpen={isOpenModalAdvice}
        setIsOpen={setIsOpenModalAdvice}
      />
      {(isFullHeader || isMobileView || isDrawer) && (
        <MenuItem disableGutters>
          <PhoneCallbackIcon />
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
              <ShoppingCartIcon sx={{ width: '24px', height: '24px' }} />
              <Typography className={styles.menuItem}>
                {orderTotal}&#8381;
              </Typography>
            </MenuItem>
          </Link>
        )}

        <MenuItem
          className={styles.menuItem_callback}
          disableGutters
          onClick={() => setIsOpenModalAdvice(true)}
        >
          <HeadphonesIcon sx={{ width: '24px', height: '24px' }} />
          {(isFullHeader || isDrawer) && (
            <Typography className={menuItemStyles}>Консультация</Typography>
          )}
        </MenuItem>

        <MenuItem className={menuItemStyles} disableGutters>
          <SearchIcon
            className={styles.menuIcon}
            sx={{ width: '24px', height: '24px' }}
          />
          {isDrawer && (
            <Typography className={menuItemStyles}>Поиск</Typography>
          )}
        </MenuItem>
      </Box>
    </>
  );
};

export { HeaderAsideNav };
