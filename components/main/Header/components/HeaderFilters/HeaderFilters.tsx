import React, { FC, useContext, useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useForm, UseFormSetValue } from 'react-hook-form';

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
  resetOptionsDataInBrandStep,
  resetOptionsDataInModelStep,
  resetOptionsDataInYearStep,
  resetOptionsDataInEngineStep,
} from 'store/reducers/transport/actions';
import { namesDefaultValueByStep } from '../../constants';
import { fetchSearchReadCategory } from 'store/reducers/catalog/actions';

import { CatalogButton } from '../CatalogButton';
import { HeaderLogo } from '../HeaderLogo';
import { HeaderAsideNav } from '../HeaderAsideNav';
import { FilterSteps } from '../FilterSteps';
import { HeaderContext } from '../HeaderContext';
import { FormData, FormDataItem, FilterInputName } from '../../types';
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
  const { getValues, control, setValue, handleSubmit } = useForm<FormData>({
    defaultValues: {
      brand: defaultValue,
      model: defaultValue,
      year: defaultValue,
      engine: defaultValue,
    },
  });
  const [openPopoverId, setOpenPopoverId] = useState(StepInputs.INACTIVE);
  const [currentStep, setCurrentStep] = useState(StepInputs.BRAND);

  const brandSlugValue = getValues('brand.slug');
  const modelSlugValue = getValues('model.slug');
  const yearSlugValue = getValues('year.slug');

  const setDefaultValueByName = (
    nameArray: FilterInputName[],
    setValue: UseFormSetValue<FormData>,
  ) => {
    nameArray.forEach((name) => {
      setValue(name, defaultValue);
    });
  };

  useEffect(() => {
    const resetDataByStep = {
      [StepInputs.BRAND]: () => {
        dispatch(fetchBrands());
        dispatch(resetOptionsDataInBrandStep());
        const names = namesDefaultValueByStep[StepInputs.BRAND];
        setDefaultValueByName(names, setValue);
      },
      [StepInputs.MODEL]: () => {
        dispatch(fetchModels({ brandSlug: brandSlugValue }));
        dispatch(resetOptionsDataInModelStep());
        const names = namesDefaultValueByStep[StepInputs.MODEL];
        setDefaultValueByName(names, setValue);
      },
      [StepInputs.YEAR]: () => {
        dispatch(
          fetchYears({ brandSlug: brandSlugValue, modelSlug: modelSlugValue }),
        );
        dispatch(resetOptionsDataInYearStep());
        const names = namesDefaultValueByStep[StepInputs.YEAR];
        setDefaultValueByName(names, setValue);
      },
      [StepInputs.ENGINE]: () => {
        dispatch(
          fetchEngines({
            brandSlug: brandSlugValue,
            modelSlug: modelSlugValue,
            yearSlug: yearSlugValue,
          }),
        );
        dispatch(resetOptionsDataInEngineStep());
        const names = namesDefaultValueByStep[StepInputs.ENGINE];
        setDefaultValueByName(names, setValue);
      },
      [StepInputs.INACTIVE]: () => {
        null;
      },
    };

    resetDataByStep[currentStep]();
  }, [
    dispatch,
    currentStep,
    getValues,
    setValue,
    brandSlugValue,
    modelSlugValue,
    yearSlugValue,
  ]);

  const onSubmit = handleSubmit((data) => {
    const { brand, model, year, engine } = data;
    dispatch(
      fetchSearchReadCategory({
        brandSlug: brand.slug,
        modelSlug: model.slug,
        yearSlug: year.slug,
        engineSlug: engine.slug,
      }),
    );
  });

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
              sx={{ flexWrap: { sm: 'wrap', lg: 'nowrap' } }}
              className={cn(styles.filterStepsForm, {
                [styles.filterStepsForm_shortHeader]:
                  !isFullHeader || isTabletView,
                [styles.filterStepsForm_mobileView]: isMobileView,
              })}
            >
              <FilterSteps
                openPopoverId={openPopoverId}
                setOpenPopoverId={setOpenPopoverId}
                control={control}
                setValue={setValue}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              />

              <CustomButton
                onClick={onSubmit}
                customStyles={styles.stepButtonSubmit}
              >
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
