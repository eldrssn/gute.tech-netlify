import React, { useState } from 'react';
import classnames from 'classnames/bind';

import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { menuNavItems } from 'mock/menuNavItems';
import { CustomButton } from 'components/ui/CustomButton';

import { DrawerContent } from '../DrawerContent';

import styles from './headerMobileDrawer.module.css';

const cn = classnames.bind(styles);

export const HeaderMobileDrawer = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen((open) => !open);
  };
  return (
    <>
      <Container className={styles.headerMobileContainer}>
        <CustomButton
          customStyles={styles.asideButton}
          onClick={handleDrawerToggle}
        >
          <span
            className={cn(styles.catalogIcon, styles.catalogIconLines, {
              [styles.catalogIconLines_open]: open,
            })}
          />
        </CustomButton>
        <MenuItem>
          <ShoppingCartIcon />
          <Typography className={styles.menuItem}>
            {menuNavItems.shoppingCart}
          </Typography>
        </MenuItem>
      </Container>
      <Divider />

      <Drawer
        transitionDuration={500}
        sx={{
          '& .MuiDrawer-paper': {
            width: '100vw',
            top: '62px',
            boxSizing: 'border-box',
            borderRight: 'none',
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerContent />
      </Drawer>
    </>
  );
};
