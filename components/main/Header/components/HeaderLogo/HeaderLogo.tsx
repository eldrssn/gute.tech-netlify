import React, { FC } from 'react';
import classnames from 'classnames/bind';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';

import { selectShowcaseData } from 'store/reducers/showcase/selectors';
import { useWindowSize } from 'hooks/useWindowSize';

import styles from './headerLogo.module.scss';

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
        order: '-2',
      }}
    >
      <Link href={'/'} passHref>
        <a
          className={cn(styles.header_logo, {
            [styles.header_logo_mobile]: isMobile,
          })}
        >
          <CardMedia
            component='img'
            className={styles.header_img}
            src={logo}
            alt='header logo'
          />
        </a>
      </Link>
    </Box>
  );
};

export { HeaderLogo };
