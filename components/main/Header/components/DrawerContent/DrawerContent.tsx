import React, { FC, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Drawer from '@mui/material/Drawer';

import { ModalCity } from 'components/main/ModalCity';
import { CustomButton } from 'components/ui/CustomButton';
import { selectCity } from 'store/reducers/regions/selectors';

import { HeaderAsideNav } from '../HeaderAsideNav';
import { HeaderLogo } from '../HeaderLogo';
import { CatalogMenuMobile } from '../CatalogMenuMobile';
import { SearchMenuMobile } from '../SearchMenuMobile';

import { DrawerContentProps, DrawerContentKeys } from './types';
import styles from './drawerContent.module.css';

const DrawerContent: FC<DrawerContentProps> = ({
  closeMainDrawer,
  setIsFocusSearchField,
}) => {
  const [isOpenCityModal, setIsOpenCityModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [drawerContentKey, setDrawerContentKey] = useState<DrawerContentKeys>(
    DrawerContentKeys.CATALOG,
  );

  const city = useSelector(selectCity);

  const handleDrawerToggle = () => {
    setOpen((open) => !open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sliderDirection = useMemo(
    () => (open ? 'translateX(-100vw)' : 'translateX(0)'),
    [open],
  );

  const drawerContent = {
    [DrawerContentKeys.CATALOG]: (
      <CatalogMenuMobile
        handleClose={handleClose}
        closeMainDrawer={closeMainDrawer}
      />
    ),
    [DrawerContentKeys.SEARCH]: (
      <SearchMenuMobile
        handleClose={handleClose}
        closeMainDrawer={closeMainDrawer}
      />
    ),
  };

  return (
    <>
      <ModalCity isOpen={isOpenCityModal} setIsOpen={setIsOpenCityModal} />
      <Container
        className={styles.navContainer}
        sx={{ transform: sliderDirection }}
      >
        <HeaderLogo isDrawer={true} closeMainDrawer={closeMainDrawer} />
        <Divider className={styles.divider} />
        <Box className={styles.asideNavContainer}>
          <HeaderAsideNav
            isDrawer={true}
            setIsFocusSearchField={setIsFocusSearchField}
          />
        </Box>
        <Divider className={styles.divider} />
        <p className={styles.location} onClick={() => setIsOpenCityModal(true)}>
          Выбран город: <span className={styles.location_current}>{city}</span>
        </p>
        <CustomButton
          onClick={() => {
            handleDrawerToggle();
            setDrawerContentKey(DrawerContentKeys.CATALOG);
          }}
          customStyles={styles.catalogButton}
        >
          <p className={styles.catalogButtonTitle}>Каталог товаров</p>
          <ArrowForwardIosIcon />
        </CustomButton>
        <CustomButton
          onClick={() => {
            handleDrawerToggle();
            setDrawerContentKey(DrawerContentKeys.SEARCH);
          }}
          customStyles={styles.catalogButton}
        >
          <p className={styles.catalogButtonTitle}>Поиск</p>
          <ArrowForwardIosIcon />
        </CustomButton>
      </Container>

      <Drawer
        sx={{
          '& .MuiDrawer-paper': {
            top: 0,
            borderLeft: 'none',
            backgroundColor: '#333333',
            width: '100%',
          },
        }}
        transitionDuration={400}
        variant='persistent'
        anchor='right'
        open={open}
      >
        {drawerContent[drawerContentKey]}
      </Drawer>
    </>
  );
};

export { DrawerContent };
