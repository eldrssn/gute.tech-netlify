import React, { FC, useContext, useState } from 'react';
import classnames from 'classnames/bind';

import Stepper from '@mui/material/Stepper';

import { HeaderContext } from '../HeaderContext';
import { FilterStep } from '../FilterStep';

import { filterSteps } from '../../constants';
import { Props } from './types';

import styles from './filterSteps.module.css';

const cn = classnames.bind(styles);

export const FilterSteps: FC<Props> = ({ activeStep, ...rest }) => {
  const { isMobileView } = useContext(HeaderContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  console.log(anchorEl);

  return (
    <Stepper
      activeStep={activeStep}
      className={cn({ [styles.stepper_mobileView]: isMobileView })}
    >
      {filterSteps.map(({ name, inputStepId }) => (
        <FilterStep
          name={name}
          key={name}
          activeStep={activeStep}
          inputStepId={inputStepId}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          {...rest}
        />
      ))}
    </Stepper>
  );
};
