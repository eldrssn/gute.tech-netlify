import React, { FC } from 'react';

import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import { HeaderLogo } from '../HeaderLogo';
import { HeaderCity } from '../HeaderCity';

import styles from './headerMobileNav.module.scss';

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
