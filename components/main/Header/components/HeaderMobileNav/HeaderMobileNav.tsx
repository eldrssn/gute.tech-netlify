import React, { FC } from 'react';

import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

import { HeaderLogo } from '../HeaderLogo';
import { HeaderCity } from '../HeaderCity';

import styles from './headerMobileNav.module.scss';
import { Box } from '@mui/material';

const HeaderMobileNav: FC = () => (
  <>
    <Container className={styles.headerMobileContainer}>
      <Box className={styles.headerLogoContainer}>
        <HeaderLogo />
      </Box>

      <HeaderCity />
    </Container>
    <Divider />
  </>
);

export { HeaderMobileNav };
