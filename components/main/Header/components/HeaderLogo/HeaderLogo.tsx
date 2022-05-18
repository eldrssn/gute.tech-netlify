import React, { FC, useContext } from 'react';
import classnames from 'classnames/bind';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';

import { IsDrawerProps } from 'components/main/Header/types';
import { selectShowcaseData } from 'store/reducers/showcase/selectors';

import { HeaderContext } from '../HeaderContext';
import styles from './headerLogo.module.css';

const cn = classnames.bind(styles);

const HeaderLogo: FC<IsDrawerProps> = ({ isDrawer, closeMainDrawer }) => {
  const { isFullHeader, isMobileView } = useContext(HeaderContext);

  const { logo, title } = useSelector(selectShowcaseData);

  return (
    <Box
      sx={{
        display: {
          xs: isMobileView || isDrawer ? 'flex' : 'none',
          sm: 'flex',
        },
        flexDirection: isDrawer ? 'column' : 'row',
      }}
    >
      <Link href={'/'} passHref>
        <a
          onClick={closeMainDrawer}
          className={cn(styles.header_logo, {
            [styles.header_logo_mobile]: isMobileView,
          })}
        >
          <Image
            className={styles.header_img}
            src={logo ? logo : '/logo-example.jpeg'}
            alt='header logo'
            layout='fill'
          />
        </a>
      </Link>

      <Box
        sx={{
          display: isFullHeader || isDrawer ? 'flex' : 'none',
          alignItems: 'center',
          marginLeft: isDrawer ? 0 : '15px',
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

      {isFullHeader && !isMobileView && (
        <MenuItem disableGutters>
          <SearchIcon
            sx={{
              width: '24px',
              height: '24px',
              margin: '0 5px',
            }}
          />
        </MenuItem>
      )}
    </Box>
  );
};

export { HeaderLogo };
