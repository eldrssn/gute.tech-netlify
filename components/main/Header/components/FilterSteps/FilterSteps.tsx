import React, { FC, useContext } from 'react';
import classnames from 'classnames/bind';

import Stepper from '@mui/material/Stepper';
import { HeaderContext } from '../HeaderContext';
import { FilterStep } from '../FilterStep';

import { filterSteps } from '../../constants';
import { Props } from './types';
import styles from './filterSteps.module.scss';

const cn = classnames.bind(styles);

export const FilterSteps: FC<Props> = ({ activeStep, ...restProps }) => {
  const { isMobileView } = useContext(HeaderContext);

  return (
    <Stepper
      activeStep={activeStep}
      className={cn({ [styles.stepper_mobileView]: isMobileView })}
    >
      {filterSteps.map(({ name, inputStepId, placeholder }) => (
        <FilterStep
          placeholder={placeholder}
          name={name}
          key={name}
          activeStep={activeStep}
          inputStepId={inputStepId}
          {...restProps}
        />
      ))}
    </Stepper>
  );
};
