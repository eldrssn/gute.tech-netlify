import React, { FC, useContext } from 'react';
import classnames from 'classnames/bind';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { IsDrawerProps } from 'components/main/Header/types';
import { selectShowcaseData } from 'store/reducers/showcase/selectors';

import { HeaderContext } from '../HeaderContext';
import styles from './headerLogo.module.css';

const cn = classnames.bind(styles);

export const HeaderLogo: FC<IsDrawerProps> = ({ isDrawer }) => {
  const { isFullHeader, isMobileView } = useContext(HeaderContext);

  const { logo, title } = useSelector(selectShowcaseData);

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
            src={logo ? logo : '/logo-example.jpeg'}
            alt='header logo'
            width={125}
            height={44}
          />
        </a>
      </Link>
      <Box
        sx={{
          display: isFullHeader || isDrawer ? 'flex' : 'none',
          alignItems: 'center',
        }}
      >
        <Typography
          component='div'
          className={cn(styles.headerTitle, {
            [styles.headerTitle_mobile]: isDrawer,
          })}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
};
