import React, { useState } from 'react';
import classnames from 'classnames/bind';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { CustomButton } from 'components/ui/CustomButton';
import { selectOrderTotal } from 'store/reducers/cart/selectors';

import { DrawerContent } from '../DrawerContent';

import styles from './headerMobileDrawer.module.css';

const cn = classnames.bind(styles);

const HeaderMobileDrawer = () => {
  const [open, setOpen] = useState(false);

  const orderTotal = useSelector(selectOrderTotal);

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
        <Link href={'/cart'} passHref>
          <MenuItem>
            <ShoppingCartIcon sx={{ width: '24px', height: '24px' }} />
            <Typography className={styles.menuItem}>
              {orderTotal}&#8381;
            </Typography>
          </MenuItem>
        </Link>
      </Container>
      <Divider />

      <Drawer
        transitionDuration={500}
        sx={{
          '& .MuiDrawer-paper': {
            width: '100vw',
            top: '60px',
            boxSizing: 'border-box',
            borderRight: 'none',
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerContent closeMainDrawer={handleDrawerToggle} />
      </Drawer>
    </>
  );
};

export { HeaderMobileDrawer };
