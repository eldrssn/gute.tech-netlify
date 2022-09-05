import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames/bind';
import { useForm, UseFormSetValue } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { selectTransportId } from 'store/reducers/transport/selectors';
import {
  fetchBrands,
  fetchEngines,
  fetchModels,
  fetchYears,
  resetOptionsDataInBrandStep,
  resetOptionsDataInEngineStep,
  resetOptionsDataInModelStep,
  resetOptionsDataInYearStep,
} from 'store/reducers/transport/actions';

import { CustomButton } from 'components/ui/CustomButton';
import {
  namesDefaultValueByStep,
  defaultValue,
} from 'components/main/Header/constants';
import {
  FilterInputName,
  FormData,
  StepInputs,
  WatchFormData,
} from 'components/main/Header/types';

import { FilterSteps } from '../FilterSteps';
import { getTransportParams } from './helpers';
import { HeaderFiltersFormProps, TransportType } from './types';

import styles from '../HeaderFilters/headerFilters.module.scss';

const cn = classnames.bind(styles);

const HeaderFiltersForm: FC<HeaderFiltersFormProps> = ({
  closePopupMobile,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

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
  const [transportType, setTransportType] = useState<TransportType>();
  const [currentTransportId, setCurrentTransportId] = useState<TransportType>();
  const [valueForm, setValueForm] = useState<WatchFormData>();

  const brandSlugValue = getValues('brand.slug');
  const modelSlugValue = getValues('model.slug');
  const yearSlugValue = getValues('year.slug');
  const engineSlug = getValues('engine.slug');

  const transportId = useSelector(selectTransportId);

  useEffect(() => {
    const subscription = watch((value) => setValueForm(value));
    return () => subscription.unsubscribe();
  }, [watch]);

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
    transportType,
    brandSlugValue,
    modelSlugValue,
    yearSlugValue,
  ]);

  useEffect(() => {
    if (transportId) {
      return;
    }

    reset();
    setCurrentStep(StepInputs.INACTIVE);
  }, [transportId, reset]);

  const isDisableButton = engineSlug === '';

  const onSubmit = handleSubmit(() => {
    if (isDisableButton || !currentTransportId) {
      return;
    }

    const params = getTransportParams(currentTransportId);
    router.push(params);

    closePopupMobile && closePopupMobile();
  });

  return (
    <>
      <FilterSteps
        openPopoverId={openPopoverId}
        setOpenPopoverId={setOpenPopoverId}
        control={control}
        setValue={setValue}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        setTransportType={setTransportType}
        setCurrentTransportId={setCurrentTransportId}
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
  );
};

export { HeaderFiltersForm };
