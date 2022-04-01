import React, { useState, FC, useContext, useEffect } from 'react';
import classnames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useController } from 'react-hook-form';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';

import { CustomButton } from 'components/ui/CustomButton';
import { fetchBrands, fetchModels } from 'store/reducers/content/actions';

import { CatalogButton } from '../CatalogButton';
import { HeaderLogo } from '../HeaderLogo';
import { HeaderAsideNav } from '../HeaderAsideNav';
import { FilterSteps } from '../FilterSteps';
import { HeaderContext } from '../HeaderContext';

import { FormData } from '../../types';

import styles from './headerFilters.module.css';

const cn = classnames.bind(styles);

export const HeaderFilters: FC = () => {
  const dispatch = useDispatch();
  const { isFullHeader, isMobileView, isTabletView } =
    useContext(HeaderContext);

  const { control, setValue } = useForm<FormData>();

  const [activeStep, setActiveStep] = React.useState(-1);

  const getModel = (slug: string) => {
    dispatch(fetchModels({ slug }));
  };

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

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
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                control={control}
                setValue={setValue}
              />

              <CustomButton customStyles={styles.stepButtonSubmit}>
                Подобрать детали
              </CustomButton>
            </FormControl>

            {!isMobileView && <CatalogButton />}
          </Box>

          {!isFullHeader && !isMobileView && <HeaderAsideNav />}
        </Box>
      </Container>

      {!isFullHeader && !isMobileView && <Divider />}
    </>
  );
};
