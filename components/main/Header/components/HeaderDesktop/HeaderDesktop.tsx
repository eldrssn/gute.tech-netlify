import React, { FC, useContext } from 'react';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import classnames from 'classnames/bind';

import { useWindowSize } from 'hooks/useWindowSize';

import { HeaderContext } from '../HeaderContext';
import { HeaderFilters } from '../HeaderFilters';
import { HeaderCity } from '../HeaderCity';
import { HeaderLogo } from '../HeaderLogo';
import { SearchField } from '../SearchField';
import { HeaderAsideNav } from '../HeaderAsideNav';
import { CatalogButton } from '../CatalogButton';

import styles from './headerDesktop.module.scss';

const cn = classnames.bind(styles);

const HeaderDesktop: FC = () => {
  const { isMobile, isTablet } = useWindowSize();
  const { isFullHeader, isFocusSearchField } = useContext(HeaderContext);

  const isHiddenFilter = !isFullHeader && isFocusSearchField && !isTablet;
  const isShortDesktopHeader = !isFullHeader && !isMobile;

  return (
    <>
      <Container className={styles.mainContainer}>
        {isFullHeader && <HeaderCity />}

        <Box
          className={cn(styles.headerDesktopFull, {
            [styles.headerDesktop_short]: isShortDesktopHeader,
          })}
          sx={{ flexWrap: { xs: 'wrap', lg: 'nowrap' } }}
        >
          <HeaderLogo />
          {isShortDesktopHeader && <CatalogButton />}
          {isShortDesktopHeader && !isHiddenFilter && <HeaderFilters />}
          <SearchField />
          <HeaderAsideNav />
        </Box>
      </Container>

      <Divider />

      {isFullHeader && <HeaderFilters />}
    </>
  );
};

export { HeaderDesktop };
