import React, { FC, useContext } from 'react';
import classnames from 'classnames/bind';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';

import { useWindowSize } from 'hooks/useWindowSize';

import { CatalogButton } from '../CatalogButton';
import { HeaderContext } from '../HeaderContext';
import { HeaderFiltersForm } from '../HeaderFiltersForm';

import { HeaderFiltersProps } from './types';

import styles from './headerFilters.module.scss';

const cn = classnames.bind(styles);

const HeaderFilters: FC<HeaderFiltersProps> = ({ closePopupMobile }) => {
  const { isMobile, isTablet } = useWindowSize();
  const { isFullHeader } = useContext(HeaderContext);

  const isFullDesktopHeader = isFullHeader && !isMobile;
  const isShortDesktopHeader = !isFullHeader && !isMobile;

  return (
    <Container
      sx={{
        order: { xs: 1, lg: 0 },
        display: isFullHeader ? 'block' : 'flex',
        flexWrap: { xs: 'wrap', lg: 'nowrap' },
      }}
      className={cn(styles.mainContainer, {
        [styles.mainContainer_short]: isShortDesktopHeader,
      })}
    >
      {isFullDesktopHeader && (
        <Typography className={styles.filterText} component='p'>
          Воспользуйтесь фильтром и сайт автоматически подберёт подходящие
          детали для вашего транспорта
        </Typography>
      )}

      <Box
        className={styles.formAndCatalogContainer}
        sx={{
          order: { xs: 1, lg: 0 },
          marginTop: { sm: '5px', lg: 0 },
        }}
      >
        <FormControl
          className={cn(styles.filterStepsForm, {
            [styles.filterStepsForm_shortHeader]: !isFullHeader || isTablet,
            [styles.filterStepsForm_mobileView]: isMobile,
          })}
        >
          <HeaderFiltersForm closePopupMobile={closePopupMobile} />
        </FormControl>

        {isFullDesktopHeader && <CatalogButton />}
      </Box>
    </Container>
  );
};

export { HeaderFilters };
