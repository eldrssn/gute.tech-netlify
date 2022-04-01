import React, { FC, useContext, useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import { useController } from 'react-hook-form';

import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import TextField from '@mui/material/TextField';

import { FilterPopover } from '../FilterPopover';
import { HeaderContext } from '../HeaderContext';

import { Props } from './types';

import styles from './filterSteps.module.css';

const cn = classnames.bind(styles);

//TODO: добавить диномический класс для отображение цвета стрелочки

export const FilterStep: FC<Props> = ({
  activeStep,
  setActiveStep,
  name,
  setValue,
  control,
  currentStep,
}) => {
  const input = useController({
    name: name,
    control,
  });
  const { isFullHeader, isTabletView } = useContext(HeaderContext);
  const [isOpenPopover, setIsOpenPopover] = useState(false);

  const isValue = Boolean(input.field.value);
  console.log(isValue);
  const isDisable = isValue && activeStep < currentStep;

  const onClickStep = (currentStep: number) => () => {
    setActiveStep(currentStep);
  };

  const handleClick = (value: string) => {
    setValue(name, value);
    setActiveStep(activeStep + 1);
  };

  useEffect(() => {
    if (activeStep === currentStep) {
      setIsOpenPopover(true);
      return;
    }

    setIsOpenPopover(false);
  }, [activeStep, currentStep]);

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
          name={name}
          value={input.field.value}
          placeholder={name}
          onClick={onClickStep(currentStep)}
          disabled={isDisable}
        />
        <FilterPopover
          setActiveStep={setActiveStep}
          setIsOpenPopover={setIsOpenPopover}
          isOpenPopover={isOpenPopover}
          step={currentStep}
          handleClick={handleClick}
        />
      </div>
    </Step>
  );
};
