import React, { FC } from 'react';
import classnames from 'classnames/bind';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';

import { selectShowcaseData } from 'store/reducers/showcase/selectors';
import { useWindowSize } from 'hooks/useWindowSize';

import styles from './headerLogo.module.scss';
import Image from 'next/image';

const cn = classnames.bind(styles);

const HeaderLogo: FC = () => {
  const { isMobile } = useWindowSize();

  const { logo } = useSelector(selectShowcaseData);

  return (
    <Box
      sx={{
        display: {
          xs: isMobile ? 'flex' : 'none',
          sm: 'flex',
        },
        flexDirection: 'row',
      }}
    >
      <Link href={'/'} passHref>
        <a
          className={cn(styles.header_logo, {
            [styles.header_logo_mobile]: isMobile,
          })}
        >
          {/* <CardMedia
            component='img'
            className={styles.header_img}
            src={logo ? logo : '/logo-example.jpeg'}
            alt='header logo'
          /> */}
          <Image
            alt='header logo'
            width={'50'}
            height={'50'}
            layout='fixed'
            src={logo ? logo : '/logo-example.jpeg'}
          />
        </a>
      </Link>
    </Box>
  );
};

export { HeaderLogo };
