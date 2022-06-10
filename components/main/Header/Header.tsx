import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import AppBar from '@mui/material/AppBar';

import { useWindowSize } from 'hooks/useWindowSize';
import { selectTransportStore } from 'store/reducers/transport/selectors';

import { HeaderFilters } from './components/HeaderFilters';
import { HeaderDesktopFull } from './components/HeaderDesktopFull';
import { HeaderContext } from './components/HeaderContext';
import { HeaderMobile } from './components/HeaderMobile';

import { getYearsInfo } from './helpers';
import styles from './styles.module.scss';

const Header = () => {
  const [isFullHeader, setisFullHeader] = useState<boolean>(true);
  const [isFocusSearchField, setIsFocusSearchField] = useState(false);
  const [transportText, setTransportText] = useState<string>('');

  const { isTablet, isMobile } = useWindowSize();

  const transport = useSelector(selectTransportStore);
  const { transportInfo, transportId } = transport;

  const isTabletView = isTablet;
  const isMobileView = isMobile;

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

  useEffect(() => {
    if (!transportInfo.data) {
      return;
    }

    const { brand, years, engine, model } = transportInfo.data;
    const yearsInfo = getYearsInfo(years);

    const transportText = transportId
      ? `${brand.title} ${model.title} ${yearsInfo} ${engine.title}`
      : '';

    setTransportText(transportText);
  }, [transportInfo, transportId]);

  return (
    <HeaderContext.Provider
      value={{
        isFullHeader,
        isTabletView,
        isMobileView,
        isFocusSearchField,
      }}
    >
      <AppBar className={styles.headerWrapper} position='sticky'>
        {isMobileView ? (
          <HeaderMobile
            transportText={transportText}
            setIsFocusSearchField={setIsFocusSearchField}
          />
        ) : (
          <>
            <HeaderDesktopFull setIsFocusSearchField={setIsFocusSearchField} />
            <HeaderFilters
              transportText={transportText}
              setIsFocusSearchField={setIsFocusSearchField}
            />
          </>
        )}
      </AppBar>
    </HeaderContext.Provider>
  );
};

export { Header };
