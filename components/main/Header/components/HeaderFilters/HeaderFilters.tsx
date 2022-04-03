import React, { FC, useContext, useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';

import { CustomButton } from 'components/ui/CustomButton';
import {
  fetchBrands,
  fetchModels,
  fetchYears,
  fetchEngines,
} from 'store/reducers/transport/actions';

import { CatalogButton } from '../CatalogButton';
import { HeaderLogo } from '../HeaderLogo';
import { HeaderAsideNav } from '../HeaderAsideNav';
import { FilterSteps } from '../FilterSteps';
import { HeaderContext } from '../HeaderContext';

import { FormData, FormDataItem } from '../../types';
import { StepInputs } from '../../types';

import styles from './headerFilters.module.css';

const cn = classnames.bind(styles);

const defaultValue: FormDataItem = {
  title: '',
  slug: '',
};

export const HeaderFilters: FC = () => {
  const dispatch = useDispatch();
  const { isFullHeader, isMobileView, isTabletView } =
    useContext(HeaderContext);
  const { getValues, control, setValue } = useForm<FormData>({
    defaultValues: {
      brand: defaultValue,
      model: defaultValue,
      year: defaultValue,
      engine: defaultValue,
    },
  });
  const [activeStep, setActiveStep] = useState(1);
  const [currentStep, setCurrentStep] = useState(StepInputs.BRAND);

  console.log(activeStep);

  useEffect(() => {
    const brandSlugValue = getValues('brand.slug');
    const modelSlugValue = getValues('model.slug');
    const yearSlugValue = getValues('year.slug');

    if (currentStep === StepInputs.BRAND) {
      dispatch(fetchBrands());
      setValue('brand', defaultValue);
      setValue('model', defaultValue);
      setValue('year', defaultValue);
      setValue('engine', defaultValue);
    }

    if (currentStep === StepInputs.MODEL) {
      dispatch(fetchModels({ brandSlug: brandSlugValue }));
      setValue('model', defaultValue);
      setValue('year', defaultValue);
      setValue('engine', defaultValue);
    }

    if (currentStep === StepInputs.YEAR) {
      dispatch(
        fetchYears({ brandSlug: brandSlugValue, modelSlug: modelSlugValue }),
      );
      setValue('year', defaultValue);
      setValue('engine', defaultValue);
    }

    if (currentStep === StepInputs.ENGINE) {
      dispatch(
        fetchEngines({
          brandSlug: brandSlugValue,
          modelSlug: modelSlugValue,
          yearSlug: yearSlugValue,
        }),
      );
      setValue('engine', defaultValue);
    }
  }, [dispatch, currentStep, getValues, setValue]);

  console.log(currentStep);

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
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
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
