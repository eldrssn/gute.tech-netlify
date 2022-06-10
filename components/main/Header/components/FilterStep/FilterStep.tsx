import React, { FC, useContext, useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import { useController } from 'react-hook-form';
import Step from '@mui/material/Step';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { TailSpin } from 'react-loader-spinner';
import { useSelector } from 'react-redux';

import {
  selectBrands,
  selectEngines,
} from 'store/reducers/transport/selectors';
import { findTransportType } from 'utility/helpers';
import colors from 'styles/_export.module.scss';

import { FilterPopover } from '../FilterPopover';
import { HeaderContext } from '../HeaderContext';
import { FilterStepProps } from './types';
import { HandleClickProps, StepInputs } from '../../types';

import styles from './filterStep.module.scss';

const loaderColor = colors.blue;

const cn = classnames.bind(styles);

const FilterStep: FC<FilterStepProps> = ({
  openPopoverId,
  name,
  control,
  inputStepId,
  currentStep,
  placeholder,
  setOpenPopoverId,
  setValue,
  setCurrentStep,
  setTransportType,
  setCurrentTransportId,
  ...restProps
}) => {
  const input = useController({
    name: name,
    control,
    rules: { required: true },
  });
  const { isFullHeader, isTabletView } = useContext(HeaderContext);
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [isLoadingoptionList, setIsLoadingOptionList] = useState(false);

  const { searchValue, title, slug } = input.field.value;
  const inputNumber = inputStepId + 1;
  const isValue = Boolean(title !== '');
  const isDisable =
    !isValue && currentStep < inputStepId && inputStepId !== StepInputs.BRAND;
  const valueTextField =
    typeof searchValue === 'string' && isOpenPopover ? searchValue : title;

  const { data: brands } = useSelector(selectBrands);
  const { data: engines } = useSelector(selectEngines);

  useEffect(() => {
    setIsOpenPopover(openPopoverId === inputStepId);
  }, [openPopoverId, inputStepId]);

  const onClickStep = (inputStepId: number) => {
    if (!isDisable) {
      setOpenPopoverId(inputStepId);
    }
  };

  const handleClickButton = ({
    title,
    slug,
    inputStepId,
  }: HandleClickProps) => {
    setValue(name, { title, slug, searchValue: null });

    if (inputStepId === StepInputs.BRAND) {
      const typeSlug = findTransportType(brands, slug);
      setTransportType(typeSlug);
    }

    if (inputStepId === StepInputs.ENGINE) {
      const currentEngine = engines.find((engine) => engine.slug === slug);
      setCurrentTransportId(currentEngine?.transport_id);
    }

    setOpenPopoverId(openPopoverId + 1);
    setCurrentStep(
      inputStepId === StepInputs.ENGINE ? StepInputs.ENGINE : inputStepId + 1,
    );
  };

  const handleClosePopover = () => {
    setOpenPopoverId(StepInputs.INACTIVE);
    setValue(name, { title, slug, searchValue: null });
  };

  const onChangeTextField = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setCurrentStep(inputStepId);
    setValue(name, { title, slug, searchValue: event.target.value });
  };

  return (
    <>
      <FilterPopover
        setIsLoadingOptionList={setIsLoadingOptionList}
        setOpenPopoverId={setOpenPopoverId}
        openPopoverId={openPopoverId}
        setIsOpenPopover={setIsOpenPopover}
        isOpenPopover={isOpenPopover}
        inputStepId={inputStepId}
        handleClick={handleClickButton}
        searchValue={searchValue}
        handleClosePopover={handleClosePopover}
        {...restProps}
      />
      <Step key={name} sx={{ width: '100%' }}>
        <div className={styles.stepWrap}>
          <Box
            className={cn(styles.stepNumber, {
              [styles.stepNumber_shortHeader]: !isFullHeader || isTabletView,
              [styles.stepNumberDisable]: isDisable,
              [styles.stepNumberLoading]: isLoadingoptionList,
            })}
          >
            {isLoadingoptionList ? (
              <TailSpin height={25} width={25} color={loaderColor} />
            ) : isValue ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              <span
                className={cn(styles.stepNumber_number, {
                  [styles.stepNumber_numberOne]: inputNumber === 1,
                })}
              >
                {inputNumber}
              </span>
            )}
          </Box>
          <TextField
            className={styles.stepField}
            autoComplete='off'
            name={name}
            value={valueTextField}
            onChange={onChangeTextField}
            placeholder={placeholder}
            onClick={() => onClickStep(inputStepId)}
            disabled={isDisable}
          />
        </div>
      </Step>
    </>
  );
};

export { FilterStep };
