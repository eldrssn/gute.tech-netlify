import React, { FC, useContext } from 'react';
import classnames from 'classnames/bind';
import Stepper from '@mui/material/Stepper';
import { Box } from '@mui/system';

import { filterSteps } from 'components/main/Header/constants';

import { HeaderContext } from '../HeaderContext';
import { FilterStep } from '../FilterStep';

import { FilterStepsProps } from './types';

import styles from './filterSteps.module.scss';

const cn = classnames.bind(styles);

const FilterSteps: FC<FilterStepsProps> = ({
  openPopoverId,
  setTransportType,
  setTransportId,
  ...restProps
}) => {
  const { isMobileView } = useContext(HeaderContext);

  return (
    <Stepper
      activeStep={openPopoverId}
      className={cn({
        [styles.stepper_mobileView]: isMobileView,
        [styles.stepper_notMobileView]: !isMobileView,
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
            setTransportType={setTransportType}
            setTransportId={setTransportId}
            {...restProps}
          />
        ))}
      </Box>
    </Stepper>
  );
};

export { FilterSteps };
