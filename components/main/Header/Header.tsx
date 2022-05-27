import React, { useEffect, useState } from 'react';

import AppBar from '@mui/material/AppBar';

import {
  checkMobileView,
  checkTabletView,
} from 'utility/helpers/checkViewType';

import { useWindowSize } from 'hooks/useWindowSize';
import { useRouterQuery } from 'hooks/useRouterQuery';
import { getSlugsFromUrl } from 'utility/helpers';
import { QueryUrl } from 'constants/variables';

import { HeaderFilters } from './components/HeaderFilters';
import { HeaderDesktopFull } from './components/HeaderDesktopFull';
import { HeaderContext } from './components/HeaderContext';
import { HeaderMobile } from './components/HeaderMobile';

import styles from './styles.module.scss';
import { getTransportTitles } from './helpers';

const Header = () => {
  const [isFullHeader, setisFullHeader] = useState<boolean>(true);
  const [transportText, setTransportText] = useState<string>('');

  const { getQueryOption } = useRouterQuery();
  const { windowWidth } = useWindowSize();

  const transportQuery = getQueryOption(QueryUrl.TRANSPORT_QUERY);

  const isTabletView = checkTabletView(windowWidth);
  const isMobileView = checkMobileView(windowWidth);

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
      }}
    >
      <AppBar className={styles.headerWrapper} position='sticky'>
        {isMobileView ? (
          <HeaderMobile
            transportText={transportText}
            setTransportText={setTransportText}
          />
        ) : (
          <>
            <HeaderDesktopFull />
            <HeaderFilters
              transportText={transportText}
              setTransportText={setTransportText}
            />
          </>
        )}
      </AppBar>
    </HeaderContext.Provider>
  );
};

export { Header };
