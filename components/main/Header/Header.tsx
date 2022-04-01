import React, { useEffect, useState } from 'react';

import AppBar from '@mui/material/AppBar';

import {
  checkMobileView,
  checkTabletView,
} from 'utility/helpers/checkViewType';

import { useWindowSize } from 'hooks/useWindowSize';

import { HeaderFilters } from './components/HeaderFilters';
import { HeaderDesktopFull } from './components/HeaderDesktopFull';
import { HeaderContext } from './components/HeaderContext';
import { HeaderMobile } from './components/HeaderMobile';

import styles from './styles.module.scss';

export const Header = () => {
  const [isFullHeader, setisFullHeader] = useState<boolean>(true);

  useEffect(() => {
    const onScroll = () => {
      if (document) {
        const { scrollTop } = document.documentElement;

        setisFullHeader(() => !scrollTop);
      }
    };

    window?.addEventListener('scroll', onScroll, false);

    return () => {
      window?.removeEventListener('scroll', onScroll, false);
    };
  }, []);

  const { windowWidth } = useWindowSize();

  const isTabletView = checkTabletView(windowWidth);
  const isMobileView = checkMobileView(windowWidth);

  return (
    <HeaderContext.Provider
      value={{ isFullHeader, isTabletView, isMobileView }}
    >
      <AppBar className={styles.headerWrapper} position='sticky'>
        {isMobileView ? (
          <HeaderMobile />
        ) : (
          <>
            <HeaderDesktopFull />
            <HeaderFilters />
          </>
        )}
      </AppBar>
    </HeaderContext.Provider>
  );
};
