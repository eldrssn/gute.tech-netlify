import React, { useState, FC, useContext } from 'react';
import classnames from 'classnames/bind';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';

import { CustomButton } from 'components/ui/CustomButton';

import { CatalogButton } from '../CatalogButton';
import { HeaderLogo } from '../HeaderLogo';
import { HeaderAsideNav } from '../HeaderAsideNav';
import { FilterSteps } from '../FilterSteps';
import { FilterPopover } from '../FilterPopover';
import { HeaderContext } from '../HeaderContext';

import { InputIds, InputId } from './types';

import styles from './headerFilters.module.css';

const cn = classnames.bind(styles);

export const HeaderFilters: FC = () => {
  const { isFullHeader, isMobileView, isTabletView } =
    useContext(HeaderContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [carDetails, setCarDetails] = useState<Record<InputId, string>>({
    [InputIds.HEADER_CAR_SELECTION]: '',
    [InputIds.HEADER_MODEL_SELECTION]: '',
    [InputIds.HEADER_YEAR_SELECTION]: '',
    [InputIds.HEADER_ENGINE_SELECTION]: '',
  });

  const [activeStep, setActiveStep] = React.useState(0);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const anchor = event.target as HTMLElement;
    if (anchor) {
      setAnchorEl(anchor);
    }
  };

  return (
    <>
      <Container className={styles.mainContainer}>
        {!isFullHeader && !isMobileView && <HeaderLogo />}

        <Box
          className={styles.itemsContainer}
          sx={{
            display: isFullHeader ? 'block' : 'flex',
          }}
        >
          <Typography
            className={styles.filterText}
            sx={{
              display: isFullHeader && !isMobileView ? 'block' : 'none',
            }}
            component='p'
          >
            Воспользуйтесь фильтром и сайт автоматически подберёт подходящие
            детали для вашего транспорта
          </Typography>

          <Box className={styles.formAndCatalogContainer}>
            <FormControl
              className={cn(styles.filterStepsForm, {
                [styles.filterStepsForm_shortHeader]:
                  !isFullHeader || isTabletView,
                [styles.filterStepsForm_mobileView]: isMobileView,
              })}
            >
              <FilterSteps
                handleClick={handleClick}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                carDetails={carDetails}
              />

              <CustomButton customStyles={styles.stepButtonSubmit}>
                Подобрать детали
              </CustomButton>
            </FormControl>

            {!isMobileView && <CatalogButton />}
          </Box>

          {!isFullHeader && !isMobileView && <HeaderAsideNav />}

          <FilterPopover
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            setCarDetails={setCarDetails}
            carDetails={carDetails}
          />
        </Box>
      </Container>

      {!isFullHeader && !isMobileView && <Divider />}
    </>
  );
};
