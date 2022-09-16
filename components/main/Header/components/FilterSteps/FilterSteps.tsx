import React, { FC } from 'react';
import classnames from 'classnames/bind';
import Stepper from '@mui/material/Stepper';
import { Box } from '@mui/system';

import { useWindowSize } from 'hooks/useWindowSize';
import { filterSteps } from 'components/main/Header/constants';

import { FilterStep } from '../FilterStep';

import { FilterStepsProps } from './types';

import styles from './filterSteps.module.scss';

const cn = classnames.bind(styles);

const FilterSteps: FC<FilterStepsProps> = ({ openPopoverId, ...restProps }) => {
  const { isMobile } = useWindowSize();

  return (
    <Stepper
      activeStep={openPopoverId}
      className={cn({
        [styles.stepper_mobileView]: isMobile,
        [styles.stepper_notMobileView]: !isMobile,
      })}
    >
      <Box className={styles.stepperBox}>
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
      </Box>
    </Stepper>
  );
};

export { FilterSteps };
