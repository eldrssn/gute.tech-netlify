import React, { FC, useContext, useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import { useController } from 'react-hook-form';
import Step from '@mui/material/Step';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { TailSpin } from 'react-loader-spinner';

import { FilterPopover } from '../FilterPopover';
import { HeaderContext } from '../HeaderContext';

import { Props } from './types';
import { HandleClickProps, StepInputs } from '../../types';
import styles from './filterSteps.module.scss';
import colors from 'styles/_export.module.scss';

const loaderColor = colors.blue;

const cn = classnames.bind(styles);

export const FilterStep: FC<Props> = ({
  activeStep,
  setActiveStep,
  name,
  setValue,
  control,
  inputStepId,
  currentStep,
  setCurrentStep,
  placeholder,
  ...restProps
}) => {
  const input = useController({
    name: name,
    control,
  });
  const { isFullHeader, isTabletView } = useContext(HeaderContext);
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inputNumber = inputStepId + 1;

  const isValue = Boolean(input.field.value.title !== '');
  const isDisable =
    !isValue && currentStep < inputStepId && inputStepId !== StepInputs.BRAND;

  const onClickStep = (inputStepId: number) => {
    if (!isDisable) {
      setActiveStep(inputStepId);
    }
  };

  const handleClickButton = ({
    title,
    slug,
    inputStepId,
  }: HandleClickProps) => {
    setValue(name, { title: title, slug: slug });
    setActiveStep(activeStep + 1);
    setCurrentStep(inputStepId + 1);
  };

  useEffect(() => {
    setIsOpenPopover(activeStep === inputStepId);
  }, [activeStep, inputStepId]);

  return (
    <Step key={name}>
      <div className={styles.stepWrap}>
        <Box
          className={cn(styles.stepNumber, {
            [styles.stepNumber_shortHeader]: !isFullHeader || isTabletView,
            [styles.stepNumberDisable]: isDisable,
            [styles.stepNumberLoading]: isLoading,
          })}
        >
          {isLoading ? (
            <TailSpin height={25} width={25} color={loaderColor} />
          ) : isValue ? (
            <FontAwesomeIcon icon={faCheck} />
          ) : (
            inputNumber
          )}
        </Box>
        <TextField
          className={styles.stepField}
          autoComplete='off'
          aria-readonly
          name={name}
          value={input.field.value.title}
          placeholder={placeholder}
          onClick={() => onClickStep(inputStepId)}
          disabled={isDisable}
        />
        <FilterPopover
          setIsLoading={setIsLoading}
          setActiveStep={setActiveStep}
          setIsOpenPopover={setIsOpenPopover}
          isOpenPopover={isOpenPopover}
          inputStepId={inputStepId}
          handleClick={handleClickButton}
          {...restProps}
        />
      </div>
    </Step>
  );
};
