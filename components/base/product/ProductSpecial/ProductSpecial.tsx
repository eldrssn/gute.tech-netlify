import React, { FC } from 'react';
import { Box, Link } from '@mui/material';
import classnames from 'classnames/bind';

import { useWindowSize } from 'hooks/useWindowSize';
import { isMobileView } from 'utility/utils/isMobileView';

import styles from './productSpecial.module.css';

const cn = classnames.bind(styles);

export const ProductSpecial: FC = () => {
  const { windowWidth } = useWindowSize();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        order: { xs: -1, sm: 0 },
        alignItems: { xs: 'center', sm: 'start' },
      }}
      className={cn(styles.productSpecialWrapper, {
        [styles.mobileView]: isMobileView(windowWidth),
      })}
    >
      <Link
        className={cn(styles.productSpecialItem, {
          [styles.helpIcon]: !isMobileView(windowWidth),
        })}
        href='#'
      >
        Помочь с выбором
      </Link>
      <Link
        className={cn(styles.productSpecialItem, {
          [styles.specialIcon]: !isMobileView(windowWidth),
        })}
        href='#'
      >
        Спецпредложение
      </Link>
    </Box>
  );
};
