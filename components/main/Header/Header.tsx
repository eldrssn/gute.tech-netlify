import React from 'react';

import AppBar from '@mui/material/AppBar';

import { useWindowSize } from 'hooks/useWindowSize';

import { HeaderContextProvider } from './components/HeaderContext';
import { HeaderMobile } from './components/HeaderMobile';
import { HeaderDesktop } from './components/HeaderDesktop';

import styles from './styles.module.scss';

const Header = () => {
  const { isMobile } = useWindowSize();

  return (
    <HeaderContextProvider>
      <AppBar className={styles.headerWrapper} position='sticky'>
        {isMobile ? <HeaderMobile /> : <HeaderDesktop />}
      </AppBar>
    </HeaderContextProvider>
  );
};

export { Header };
