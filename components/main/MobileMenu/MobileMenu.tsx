import React, { FC } from 'react';
import Box from '@mui/material/Box';

import { MenuItem } from './components/MenuItem';
import { menuLinks } from './constants';

import styles from './mobileMenu.module.scss';

const MobileMenu: FC = () => (
  <Box component='section' className={styles.mainContainer}>
    {menuLinks.map((menuItem) => (
      <MenuItem key={menuItem.title} menuItem={menuItem} />
    ))}
  </Box>
);

export default MobileMenu;
