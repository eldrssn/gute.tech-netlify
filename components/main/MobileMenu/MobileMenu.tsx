import React, { FC } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';

import { MenuItem } from './components/MenuItem';
import { menuLinks } from './constants';

import styles from './mobileMenu.module.scss';

const MobileMenu: FC = () => {
  const router = useRouter();

  return (
    <Box component='section' className={styles.mainContainer}>
      {menuLinks.map((menuItem) => (
        <MenuItem key={menuItem.title} menuItem={menuItem} router={router} />
      ))}
    </Box>
  );
};

export { MobileMenu };
