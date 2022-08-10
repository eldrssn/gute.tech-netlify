import React, { FC, useContext } from 'react';
import classnames from 'classnames/bind';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { selectShowcaseData } from 'store/reducers/showcase/selectors';
import { useWindowSize } from 'hooks/useWindowSize';

import { HeaderContext } from '../HeaderContext';
import styles from './headerLogo.module.scss';

const cn = classnames.bind(styles);

const HeaderLogo: FC = () => {
  const { isFullHeader } = useContext(HeaderContext);
  const { isMobile } = useWindowSize();

  const { logo, title } = useSelector(selectShowcaseData);

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
          <Image
            className={styles.header_img}
            src={logo ? logo : '/logo-example.jpeg'}
            alt='header logo'
            layout='fill'
          />
        </a>
      </Link>

      {!isMobile && (
        <Box
          sx={{
            display: isFullHeader ? 'flex' : 'none',
            alignItems: 'center',
          }}
        >
          <Typography component='div' className={cn(styles.headerTitle)}>
            {title}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export { HeaderLogo };
