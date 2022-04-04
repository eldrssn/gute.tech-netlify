import React, { FC, useContext, useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import { useController } from 'react-hook-form';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import TextField from '@mui/material/TextField';

import { FilterPopover } from '../FilterPopover';
import { HeaderContext } from '../HeaderContext';

import { Props } from './types';
import { handleClickProps } from '../../types';
import { StepInputs } from '../../types';
import styles from './filterSteps.module.scss';

const cn = classnames.bind(styles);

//TODO: добавить диномический класс для отображение цвета стрелочки

export const FilterStep: FC<Props> = ({
  activeStep,
  setActiveStep,
  name,
  setValue,
  control,
  inputStepId,
  currentStep,
  setCurrentStep,
  ...rest
}) => {
  const input = useController({
    name: name,
    control,
  });
  const { isFullHeader, isTabletView } = useContext(HeaderContext);
  const [isOpenPopover, setIsOpenPopover] = useState(false);

  const isValue = Boolean(input.field.value.title.length);
  const isDisable =
    !isValue && currentStep < inputStepId && inputStepId !== StepInputs.BRAND;

  const onClickStep = (inputStepId: number) => () => {
    if (!isDisable) {
      setActiveStep(inputStepId);
    }
  };

  const handleClickButton = ({
    title,
    slug,
    inputStepId,
  }: handleClickProps) => {
    setValue(name, { title: title, slug: slug });
    setActiveStep(activeStep + 1);
    setCurrentStep(inputStepId + 1);
  };

  useEffect(() => {
    if (activeStep === inputStepId) {
      setIsOpenPopover(true);
      return;
    }

    setIsOpenPopover(false);
  }, [activeStep, inputStepId]);

  return (
    <Step key={name} completed={isValue}>
      <div className={styles.stepWrap}>
        <StepButton
          className={cn(styles.stepNumber, {
            [styles.stepNumber_shortHeader]: !isFullHeader || isTabletView,
          })}
        />

        <TextField
          className={styles.stepField}
          autoComplete='off'
          aria-readonly
          name={name}
          value={input.field.value.title}
          placeholder={name}
          onClick={onClickStep(inputStepId)}
          disabled={isDisable}
        />
        <FilterPopover
          setActiveStep={setActiveStep}
          setIsOpenPopover={setIsOpenPopover}
          isOpenPopover={isOpenPopover}
          inputStepId={inputStepId}
          handleClick={handleClickButton}
          {...rest}
        />
      </div>
    </Step>
  );
};
