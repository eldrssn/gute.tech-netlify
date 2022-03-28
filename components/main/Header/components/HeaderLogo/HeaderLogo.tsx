import React, { FC, useContext } from 'react';
import classnames from 'classnames/bind';
import Image from 'next/image';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { IsDrawerProps } from 'components/main/Header/types';

import { HeaderContext } from '../HeaderContext';

import styles from './headerLogo.module.css';
import Link from 'next/link';

const cn = classnames.bind(styles);

export const HeaderLogo: FC<IsDrawerProps> = ({ isDrawer }) => {
  const { isFullHeader, isMobileView } = useContext(HeaderContext);

  return (
    <Box
      sx={{
        display: {
          xs: isMobileView || isDrawer ? 'block' : 'none',
          lg: 'flex',
        },
      }}
    >
      <Link href={'/'} passHref>
        <a>
          <Image
            className={cn(styles.header_logo, {
              [styles.header_logo_mobile]: isMobileView,
            })}
            src={'/logo-example.jpeg'}
            alt='header logo'
            width={125}
            height={44}
          />
        </a>
      </Link>
      <Box sx={{ display: isFullHeader || isDrawer ? 'block' : 'none' }}>
        <Typography
          component='div'
          className={cn(styles.headerTitle, {
            [styles.headerTitle_mobile]: isDrawer,
          })}
        >
          Автокомпоненты
          <br />
          Фольксваген Химки
        </Typography>
      </Box>
    </Box>
  );
};
