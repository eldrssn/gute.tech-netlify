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
  resetBrands,
  resetModels,
  resetYears,
  resetEngines,
} from 'store/reducers/transport/actions';

import { CatalogButton } from '../CatalogButton';
import { HeaderLogo } from '../HeaderLogo';
import { HeaderAsideNav } from '../HeaderAsideNav';
import { FilterSteps } from '../FilterSteps';
import { HeaderContext } from '../HeaderContext';
import { FormData, FormDataItem } from '../../types';
import { StepInputs } from '../../types';
import styles from './headerFilters.module.scss';

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
  const [activeStep, setActiveStep] = useState(StepInputs.INACTIVE);
  const [currentStep, setCurrentStep] = useState(StepInputs.BRAND);

  const brandSlugValue = getValues('brand.slug');
  const modelSlugValue = getValues('model.slug');
  const yearSlugValue = getValues('year.slug');

  useEffect(() => {
    if (currentStep === StepInputs.BRAND) {
      dispatch(fetchBrands());
      dispatch(resetBrands());
      dispatch(resetModels());
      dispatch(resetYears());
      dispatch(resetEngines());
      setValue('brand', defaultValue);
      setValue('model', defaultValue);
      setValue('year', defaultValue);
      setValue('engine', defaultValue);
    }

    if (currentStep === StepInputs.MODEL) {
      dispatch(fetchModels({ brandSlug: brandSlugValue }));
      dispatch(resetModels());
      dispatch(resetYears());
      dispatch(resetEngines());
      setValue('model', defaultValue);
      setValue('year', defaultValue);
      setValue('engine', defaultValue);
    }

    if (currentStep === StepInputs.YEAR) {
      dispatch(
        fetchYears({ brandSlug: brandSlugValue, modelSlug: modelSlugValue }),
      );
      dispatch(resetYears());
      dispatch(resetEngines());
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
      dispatch(resetEngines());
      setValue('engine', defaultValue);
    }
  }, [
    dispatch,
    currentStep,
    getValues,
    setValue,
    brandSlugValue,
    modelSlugValue,
    yearSlugValue,
  ]);

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
