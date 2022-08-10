import React, { FC, useContext } from 'react';
import classnames from 'classnames/bind';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';

import { useWindowSize } from 'hooks/useWindowSize';

import { CatalogButton } from '../CatalogButton';
import { HeaderLogo } from '../HeaderLogo';
import { HeaderAsideNav } from '../HeaderAsideNav';

import { HeaderContext } from '../HeaderContext';
import { SearchField } from '../SearchField';
import { HeaderFiltersForm } from '../HeaderFiltersForm';
import { HeaderFiltersText } from '../HeaderFiltersText';

import { HeaderFiltersProps } from './types';

import styles from './headerFilters.module.scss';

const cn = classnames.bind(styles);

const HeaderFilters: FC<HeaderFiltersProps> = ({ closePopupMobile }) => {
  const { isMobile, isTablet } = useWindowSize();
  const { isFullHeader, isFocusSearchField, transportText } =
    useContext(HeaderContext);

  const isHiddenFilter = !isFullHeader && isFocusSearchField && !isTablet;
  const isFullDesktopHeader = isFullHeader && !isMobile;
  const isShortDesktopHeader = !isFullHeader && !isMobile;

  return (
    <>
      <Container className={styles.mainContainer}>
        <Box
          className={styles.itemsContainer}
          sx={{
            display: isFullHeader ? 'block' : 'flex',
            flexWrap: { xs: 'wrap', lg: 'nowrap' },
          }}
        >
          {isFullDesktopHeader && (
            <Typography className={styles.filterText} component='p'>
              Воспользуйтесь фильтром и сайт автоматически подберёт подходящие
              детали для вашего транспорта
            </Typography>
          )}

          {!isHiddenFilter && (
            <Box
              className={styles.formAndCatalogContainer}
              sx={{
                order: { xs: 1, lg: 0 },
                marginTop: { sm: '5px', lg: 0 },
              }}
            >
              <FormControl
                className={cn(styles.filterStepsForm, {
                  [styles.filterStepsForm_shortHeader]:
                    !isFullHeader || isTablet,
                  [styles.filterStepsForm_mobileView]: isMobile,
                })}
              >
                {!transportText ? (
                  <HeaderFiltersForm closePopupMobile={closePopupMobile} />
                ) : (
                  <HeaderFiltersText transportText={transportText} />
                )}
              </FormControl>

              {isFullDesktopHeader && <CatalogButton />}
            </Box>
          )}

          {isShortDesktopHeader && (
            <>
              <Box
                sx={{
                  order: -1,
                  display: 'flex',
                }}
              >
                {!isMobile && <HeaderLogo />}

                <CatalogButton />
              </Box>
              <SearchField />
            </>
          )}

          {isShortDesktopHeader && <HeaderAsideNav />}
        </Box>
      </Container>

      {isShortDesktopHeader && <Divider />}
    </>
  );
};

export { HeaderFilters };
