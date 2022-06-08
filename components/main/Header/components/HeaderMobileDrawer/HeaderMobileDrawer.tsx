import React, { useState, FC, useEffect } from 'react';
import classnames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

import { CustomButton } from 'components/ui/CustomButton';
import { selectOrderTotal } from 'store/reducers/cart/selectors';

import { DrawerContent } from '../DrawerContent';
import { HeaderMobileDrawerProps } from './types';

import styles from './headerMobileDrawer.module.scss';

const cn = classnames.bind(styles);

const HeaderMobileDrawer: FC<HeaderMobileDrawerProps> = ({
  setIsFocusSearchField,
}) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const orderTotal = useSelector(selectOrderTotal);

  const handleDrawerToggle = () => {
    setOpen((open) => !open);
  };

  const handleClickCart = () => {
    setOpen(false);
    router.push('/cart');
  };

  useEffect(() => {
    setOpen(false);
  }, [router]);

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
        <MenuItem onClick={handleClickCart}>
          <Box className={styles.shoppingCart} />
          <Typography className={styles.menuItem}>{orderTotal}</Typography>
          <i className={styles.icon_ruble} />
        </MenuItem>
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
        <DrawerContent
          closeMainDrawer={handleDrawerToggle}
          setIsFocusSearchField={setIsFocusSearchField}
        />
      </Drawer>
    </>
  );
};

export { HeaderMobileDrawer };
