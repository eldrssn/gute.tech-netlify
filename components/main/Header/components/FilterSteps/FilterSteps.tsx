import React, { FC, useContext } from 'react';
import classnames from 'classnames/bind';

import Stepper from '@mui/material/Stepper';
import { HeaderContext } from '../HeaderContext';
import { FilterStep } from '../FilterStep';

import { filterSteps } from '../../constants';
import { FilterStepsProps } from './types';
import styles from './filterSteps.module.scss';

const cn = classnames.bind(styles);

const FilterSteps: FC<FilterStepsProps> = ({ openPopoverId, ...restProps }) => {
  const { isMobileView } = useContext(HeaderContext);

  return (
    <Stepper
      activeStep={openPopoverId}
      className={cn({ [styles.stepper_mobileView]: isMobileView })}
    >
      {filterSteps.map(({ name, inputStepId, placeholder }) => (
        <FilterStep
          placeholder={placeholder}
          name={name}
          key={name}
          openPopoverId={openPopoverId}
          inputStepId={inputStepId}
          {...restProps}
        />
      ))}
    </Stepper>
  );
};

export { FilterSteps };
