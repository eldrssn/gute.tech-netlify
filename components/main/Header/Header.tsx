import React, { useEffect, useState } from 'react';

import AppBar from '@mui/material/AppBar';

import {
  checkMobileView,
  checkTabletView,
} from 'utility/helpers/checkViewType';

import { getBrands, getEngines, getModel } from 'api/routes/transport';
import { useWindowSize } from 'hooks/useWindowSize';
import { useRouterQuery } from 'hooks/useRouterQuery';
import { getSlugsFromUrl } from 'utility/helpers';
import { QueryUrl } from 'constants/variables';

import { HeaderFilters } from './components/HeaderFilters';
import { HeaderDesktopFull } from './components/HeaderDesktopFull';
import { HeaderContext } from './components/HeaderContext';
import { HeaderMobile } from './components/HeaderMobile';

import styles from './styles.module.scss';

const Header = () => {
  const [isFullHeader, setisFullHeader] = useState<boolean>(true);
  const [transportText, setTransportText] = useState<string>('');

  const { getQueryOption } = useRouterQuery();

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
    const transportQuery = getQueryOption(QueryUrl.TRANSPORT_QUERY);

    if (!transportQuery) {
      return;
    }

    const { brandSlug, modelSlug, yearSlug, engineSlug } =
      getSlugsFromUrl(transportQuery);

    const transportFromQuery = async () => {
      const brands = await getBrands();
      const models = await getModel({ brandSlug });
      const engines = await getEngines({ brandSlug, modelSlug, yearSlug });

      const currentTransport = {
        brand: brands.find((brand) => brand.slug === brandSlug),
        model: models.find((model) => model.slug === modelSlug),
        year: { title: yearSlug, slug: yearSlug },
        engine: engines.find((engine) => engine.slug === engineSlug),
      };
      setTransportText(
        `${currentTransport.brand?.title} ${currentTransport.model?.title} ${currentTransport.year.title} ${currentTransport.engine?.title}`,
      );
    };

    transportFromQuery();
  }, [getQueryOption]);

  const { windowWidth } = useWindowSize();

  const isTabletView = checkTabletView(windowWidth);
  const isMobileView = checkMobileView(windowWidth);

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
