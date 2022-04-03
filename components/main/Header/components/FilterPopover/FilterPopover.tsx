import React, { FC, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import { useSelector } from 'react-redux';

import {
  selectBrands,
  selectModels,
  selectYears,
  selectEngines,
} from 'store/reducers/transport/selectors';

import { Props } from './types';
import { CarDetailsItemData } from 'store/reducers/transport/types';
import { StepInputs } from '../../types';
import styles from './styles.module.scss';

export const FilterPopover: FC<Props> = ({
  isOpenPopover,
  setActiveStep,
  inputStepId,
  handleClick,
}) => {
  const [listData, setListData] = useState<CarDetailsItemData[]>([]);

  const id = isOpenPopover ? 'simple-popover' : undefined;

  const brands = useSelector(selectBrands);
  const models = useSelector(selectModels);
  const years = useSelector(selectYears);
  const engines = useSelector(selectEngines);

  useEffect(() => {
    if (inputStepId === StepInputs.BRAND) {
      setListData(brands);
    }

    if (inputStepId === StepInputs.MODEL) {
      setListData(models);
    }

    if (inputStepId === StepInputs.YEAR) {
      setListData(years);
    }

    if (inputStepId === StepInputs.ENGINE) {
      setListData(engines);
    }
  }, [inputStepId, brands, models, years, engines]);

  const handleClose = () => {
    setActiveStep(-1);
  };

  return (
    <Popover
      className={styles.popover}
      disableScrollLock
      id={id}
      open={isOpenPopover}
      onClose={handleClose}
      disableAutoFocus
    >
      {listData.map((item) => (
        <Button
          onClick={() => {
            handleClick({ title: item.title, slug: item.slug, inputStepId });
          }}
          key={item.slug}
        >
          {item.title}
        </Button>
      ))}
    </Popover>
  );
};
