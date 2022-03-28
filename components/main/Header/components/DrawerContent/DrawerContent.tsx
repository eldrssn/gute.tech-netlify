import React, { FC } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

import { menuNavItems } from 'mock/menuNavItems';
import { CustomButton } from 'components/ui/CustomButton';

import { HeaderAsideNav } from '../HeaderAsideNav';
import { HeaderLogo } from '../HeaderLogo';

import styles from './drawerContent.module.css';

export const DrawerContent: FC = () => (
  <Container className={styles.navContainer}>
    <HeaderLogo isDrawer={true} />
    <Divider className={styles.divider} />

    <Box className={styles.asideNavContainer}>
      <HeaderAsideNav isDrawer={true} />
    </Box>
    <Divider className={styles.divider} />

    <p className={styles.location}>
      Выбран город:{' '}
      <span className={styles.location_current}>{menuNavItems.city}</span>
    </p>

    <CustomButton>Каталог товаров</CustomButton>
  </Container>
);
