import React, { FC } from 'react';
import { Box, Link } from '@mui/material';
import classnames from 'classnames/bind';

import { useWindowSize } from 'hooks/useWindowSize';
import { checkMobileView } from 'utility/helpers/checkViewType';

import styles from './productSpecial.module.css';

const cn = classnames.bind(styles);

export const ProductSpecial: FC = () => {
  const { windowWidth } = useWindowSize();

  const isMobileView = checkMobileView(windowWidth);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        order: { xs: -1, sm: 0 },
        alignItems: { xs: 'center', sm: 'start' },
      }}
      className={cn(styles.productSpecialWrapper, {
        [styles.mobileView]: isMobileView,
      })}
    >
      <Link
        className={cn(styles.productSpecialItem, {
          [styles.helpIcon]: !isMobileView,
        })}
        href='#'
      >
        Помочь с выбором
      </Link>
      <Link
        className={cn(styles.productSpecialItem, {
          [styles.specialIcon]: !isMobileView,
        })}
        href='#'
      >
        Спецпредложение
      </Link>
    </Box>
  );
};
