/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import classnames from 'classnames/bind';
import { useForm } from 'react-hook-form';

import { setTransportId } from 'store/reducers/transport/actions';

import { CustomButton } from 'components/ui/CustomButton';
import { defaultValue } from 'components/main/Header/constants';
import {
  FormData,
  StepInputs,
  WatchFormData,
} from 'components/main/Header/types';
import { selectBrands } from 'store/reducers/transport/selectors';

import { HeaderContext } from '../HeaderContext';
import { FilterSteps } from '../FilterSteps';
import { HeaderFiltersText } from '../HeaderFiltersText';
import { getTransportParams } from './helpers';
import { setDefaultValueByName } from '../../helpers';
import { namesDefaultValueByStep } from '../../constants';
import { HeaderFiltersFormProps, TransportType } from './types';
import styles from '../HeaderFilters/headerFilters.module.scss';

const cn = classnames.bind(styles);

const HeaderFiltersForm: FC<HeaderFiltersFormProps> = ({
  closePopupMobile,
}) => {
  const router = useRouter();

  const { transportText, setTransportText } = useContext(HeaderContext);

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
  const [currentStep, setCurrentStep] = useState(StepInputs.YEAR);
  const [transportType, setTransportType] = useState<string>('');
  const [currentTransportId, setCurrentTransportId] = useState<TransportType>();
  const [valueForm, setValueForm] = useState<WatchFormData>();

  const brandSlugValue = getValues('brand.slug');
  const modelSlugValue = getValues('model.slug');
  const yearSlugValue = getValues('year.slug');
  const engineSlug = getValues('engine.slug');

  const brand = useSelector(selectBrands);

  useEffect(() => {
    const subscription = watch((value) => setValueForm(value));
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (brand.data.length <= 0) {
      return;
    }

    setTransportType(brand.data[0].slug);
  }, [brand]);

  const resetFilterFormFromBrand = () => {
    const brands = namesDefaultValueByStep[StepInputs.BRAND];
    setDefaultValueByName(brands, setValue, valueForm);
    setCurrentStep(StepInputs.BRAND);
  };

  const onSubmit = handleSubmit(() => {
    if (isDisableButton || !currentTransportId) {
      return;
    }

    const params = getTransportParams(currentTransportId);
    setTransportId(currentTransportId);
    setTransportText(
      `${brandSlugValue} ${modelSlugValue} ${yearSlugValue} ${engineSlug}`,
    );
    router.push(params);

    closePopupMobile && closePopupMobile();
  });

  const isDisableButton = engineSlug === '';

  return transportText ? (
    <HeaderFiltersText
      control={control}
      reset={reset}
      setValue={setValue}
      setCurrentStep={setCurrentStep}
      setTransportType={setTransportType}
    />
  ) : (
    <>
      <FilterSteps
        resetFilterFormFromBrand={resetFilterFormFromBrand}
        getValues={getValues}
        control={control}
        setValue={setValue}
        valueForm={valueForm}
        openPopoverId={openPopoverId}
        setOpenPopoverId={setOpenPopoverId}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        transportType={transportType}
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
