import React, { FC, useContext } from 'react';
import classnames from 'classnames/bind';

import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stepper from '@mui/material/Stepper';
import TextField from '@mui/material/TextField';

import { HeaderContext } from '../HeaderContext';

import { filterSteps } from './constants';
import { Props } from './types';

import styles from './filterSteps.module.css';

const cn = classnames.bind(styles);

export const FilterSteps: FC<Props> = ({
  handleClick,
  activeStep,
  setActiveStep,
  carDetails,
}) => {
  const { isFullHeader, isMobileView, isTabletView } =
    useContext(HeaderContext);

  const [completed] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return filterSteps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          filterSteps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
    handleNext();
  };

  const isDisabled = (index: number) => index > activeStep;

  return (
    <Stepper
      activeStep={activeStep}
      className={cn({ [styles.stepper_mobileView]: isMobileView })}
    >
      {filterSteps.map(({ name, inputId }, index) => (
        <Step key={inputId} completed={completed[index]}>
          <div onClick={handleClick} className={styles.stepWrap}>
            {/* !TODO: добавить диномический класс для отображение цвета стрелочки */}
            <StepButton
              className={cn(styles.stepNumber, {
                [styles.stepNumber_shortHeader]: !isFullHeader || isTabletView,
              })}
            />

            <TextField
              className={styles.stepField}
              autoComplete='off'
              name={name}
              value={carDetails[inputId]}
              id={inputId}
              placeholder={name}
              onChange={handleStep(index)}
              disabled={isDisabled(index)}
            />
          </div>
        </Step>
      ))}
    </Stepper>
  );
};
