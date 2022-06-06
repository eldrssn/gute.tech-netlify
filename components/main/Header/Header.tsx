import React, { useEffect, useState } from 'react';

import AppBar from '@mui/material/AppBar';

import { useWindowSize } from 'hooks/useWindowSize';
import { useRouterQuery } from 'hooks/useRouterQuery';
import { getSlugsFromUrl } from 'utility/helpers';
import { QueryUrl } from 'constants/variables';

import { HeaderFilters } from './components/HeaderFilters';
import { HeaderDesktopFull } from './components/HeaderDesktopFull';
import { HeaderContext } from './components/HeaderContext';
import { HeaderMobile } from './components/HeaderMobile';

import { getTransportTitles } from './helpers';
import styles from './styles.module.scss';

const Header = () => {
  const [isFullHeader, setisFullHeader] = useState<boolean>(true);
  const [isFocusSearchField, setIsFocusSearchField] = useState(false);
  const [transportText, setTransportText] = useState<string>('');

  const { getQueryOption } = useRouterQuery();
  const { isTablet, isMobile } = useWindowSize();

  const transportQuery = getQueryOption(QueryUrl.TRANSPORT_QUERY);

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
    if (!transportQuery) {
      return;
    }

    const transportSlugs = getSlugsFromUrl(transportQuery);

    const transportFromQuery = async () => {
      const { brand, model, year, engine } = await getTransportTitles(
        transportSlugs,
      );

      setTransportText(`${brand} ${model} ${year} ${engine}`);
    };

    transportFromQuery();
  }, [getQueryOption, transportQuery]);

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
            setTransportText={setTransportText}
            setIsFocusSearchField={setIsFocusSearchField}
          />
        ) : (
          <>
            <HeaderDesktopFull setIsFocusSearchField={setIsFocusSearchField} />
            <HeaderFilters
              transportText={transportText}
              setTransportText={setTransportText}
              setIsFocusSearchField={setIsFocusSearchField}
            />
          </>
        )}
      </AppBar>
    </HeaderContext.Provider>
  );
};

export { Header };
