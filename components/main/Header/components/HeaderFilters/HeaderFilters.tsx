import React, { FC, useContext, useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useForm, UseFormSetValue } from 'react-hook-form';
import { useRouter } from 'next/router';

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
import { namesDefaultValueByStep } from 'components/main/Header/constants';
import {
  FormData,
  WatchFormData,
  FilterInputName,
  StepInputs,
} from 'components/main/Header/types';
import { QueryUrl } from 'constants/variables';
import { useRouterQuery } from 'hooks/useRouterQuery';

import { CatalogButton } from '../CatalogButton';
import { HeaderLogo } from '../HeaderLogo';
import { HeaderAsideNav } from '../HeaderAsideNav';
import { FilterSteps } from '../FilterSteps';
import { HeaderContext } from '../HeaderContext';
import { SearchField } from '../SearchField';

import { defaultValue } from './constants';
import { getTransportParams } from './helpers';
import { HeaderFiltersProps } from './types';

import styles from './headerFilters.module.scss';

const cn = classnames.bind(styles);

const HeaderFilters: FC<HeaderFiltersProps> = ({
  transportText,
  setTransportText,
  closePopupMobile,
  setIsFocusSearchField,
}) => {
  const router = useRouter();
  const { getQueryOption } = useRouterQuery();
  const dispatch = useDispatch();
  const { isFullHeader, isMobileView, isTabletView, isFocusSearchField } =
    useContext(HeaderContext);
  const { getValues, control, setValue, handleSubmit, reset, watch } =
    useForm<FormData>({
      defaultValues: {
        brand: defaultValue,
        model: defaultValue,
        year: defaultValue,
        engine: defaultValue,
      },
    });
  const [openPopoverId, setOpenPopoverId] = useState(StepInputs.INACTIVE);
  const [currentStep, setCurrentStep] = useState(StepInputs.BRAND);
  const [transportType, setTransportType] = useState<string | undefined>();
  const [transportId, setTransportId] = useState<string | undefined>();
  const [valueForm, setValueForm] = useState<WatchFormData>();

  const brandSlugValue = getValues('brand.slug');
  const modelSlugValue = getValues('model.slug');
  const yearSlugValue = getValues('year.slug');
  const engineSlug = getValues('engine.slug');

  useEffect(() => {
    const subscription = watch((value) => setValueForm(value));
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    const transportQuery = getQueryOption(QueryUrl.TRANSPORT_QUERY);

    if (transportQuery) {
      return;
    }

    setTransportText('');
    reset();
    setCurrentStep(StepInputs.INACTIVE);
  }, [getQueryOption, reset, setTransportText]);

  useEffect(() => {
    const setDefaultValueByName = (
      nameArray: FilterInputName[],
      setValue: UseFormSetValue<FormData>,
    ) => {
      nameArray.forEach((name) => {
        const searchValue = valueForm ? valueForm[name]?.searchValue : '';
        setValue(name, {
          title: '',
          slug: '',
          searchValue: searchValue ? searchValue : null,
        });
      });
    };

    const resetDataByStep = {
      [StepInputs.BRAND]: () => {
        dispatch(fetchBrands());
        dispatch(resetOptionsDataInBrandStep());
        const names = namesDefaultValueByStep[StepInputs.BRAND];
        setDefaultValueByName(names, setValue);
      },
      [StepInputs.MODEL]: () => {
        dispatch(fetchModels({ transportType, brandSlug: brandSlugValue }));
        dispatch(resetOptionsDataInModelStep());
        const names = namesDefaultValueByStep[StepInputs.MODEL];
        setDefaultValueByName(names, setValue);
      },
      [StepInputs.YEAR]: () => {
        dispatch(
          fetchYears({
            transportType,
            brandSlug: brandSlugValue,
            modelSlug: modelSlugValue,
          }),
        );
        dispatch(resetOptionsDataInYearStep());
        const names = namesDefaultValueByStep[StepInputs.YEAR];
        setDefaultValueByName(names, setValue);
      },
      [StepInputs.ENGINE]: () => {
        dispatch(
          fetchEngines({
            transportType,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (engineSlug === '' || !transportId) {
      return;
    }

    const params = getTransportParams(data, transportId);
    router.push(params);

    closePopupMobile && closePopupMobile();
  });

  const resetFilter = () => {
    setCurrentStep(StepInputs.INACTIVE);
    setTransportText('');
    reset();
    router.push('/');
  };

  const isDisableButton = engineSlug === '';
  const hiddenFilter = !isFullHeader && isFocusSearchField && !isTabletView;

  return (
    <>
      <Container className={styles.mainContainer}>
        <Box
          className={styles.itemsContainer}
          sx={{
            display: isFullHeader ? 'block' : 'flex',
            flexDirection: 'row',
            flexWrap: { xs: 'wrap', lg: 'nowrap' },
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

          {!hiddenFilter && (
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
                  <>
                    <FilterSteps
                      openPopoverId={openPopoverId}
                      setOpenPopoverId={setOpenPopoverId}
                      control={control}
                      setValue={setValue}
                      currentStep={currentStep}
                      setCurrentStep={setCurrentStep}
                      setTransportType={setTransportType}
                      setTransportId={setTransportId}
                    />
                    <CustomButton
                      onClick={onSubmit}
                      customStyles={cn(styles.stepButtonSubmit, {
                        [styles.stepButtonSubmitInactive]: isDisableButton,
                      })}
                      disabled={isDisableButton}
                    >
                      Подобрать детали
                    </CustomButton>
                  </>
                ) : (
                  <Box
                    className={cn(styles.choosenTransport_container, {
                      [styles.choosenTransport_container_mobile]: isMobileView,
                    })}
                  >
                    <div className={styles.choosenTransport}>
                      <p className={styles.choosenTransport_label}>
                        Показаны товары для: &nbsp;
                      </p>
                      <p className={styles.choosenTransport_text}>
                        {transportText}
                      </p>
                    </div>
                    <CustomButton
                      onClick={resetFilter}
                      customStyles={styles.stepButtonSubmit}
                    >
                      Сбросить фильтр
                    </CustomButton>
                  </Box>
                )}
              </FormControl>

              {isFullHeader && !isMobileView && <CatalogButton />}
            </Box>
          )}

          {!isFullHeader && !isMobileView && (
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

          {!isFullHeader && !isMobileView && (
            <HeaderAsideNav setIsFocusSearchField={setIsFocusSearchField} />
          )}
        </Box>
      </Container>

      {!isFullHeader && !isMobileView && <Divider />}
    </>
  );
};

export { HeaderFilters };
