import React, { FC, useContext } from 'react';
import classnames from 'classnames/bind';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';

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

const HeaderFilters: FC<HeaderFiltersProps> = ({
  transportText,
  closePopupMobile,
  setIsFocusSearchField,
}) => {
  const { isFullHeader, isMobileView, isTabletView, isFocusSearchField } =
    useContext(HeaderContext);

  const isHiddenFilter = !isFullHeader && isFocusSearchField && !isTabletView;
  const isFullDesktopHeader = isFullHeader && !isMobileView;
  const isShortDesktopHeader = !isFullHeader && !isMobileView;

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
                    !isFullHeader || isTabletView,
                  [styles.filterStepsForm_mobileView]: isMobileView,
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
                {!isMobileView && <HeaderLogo />}

                <CatalogButton />
              </Box>
              <SearchField setIsFocusSearchField={setIsFocusSearchField} />
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
