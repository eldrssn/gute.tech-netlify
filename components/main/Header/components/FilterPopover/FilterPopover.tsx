import React, { FC, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import cn from 'classnames';

import {
  selectBrands,
  selectModels,
  selectYears,
  selectEngines,
} from 'store/reducers/transport/selectors';

import { Props } from './types';
import { ListOptionsItem } from 'types/transportStore';
import { StepInputs } from '../../types';
import styles from './styles.module.scss';

export const FilterPopover: FC<Props> = ({
  isOpenPopover,
  setActiveStep,
  inputStepId,
  handleClick,
  setIsLoading,
}) => {
  const [optionsItem, setOptionsItem] = useState<ListOptionsItem>({
    data: [],
    isLoading: false,
    error: {
      name: '',
      message: '',
    },
  });
  const brands = useSelector(selectBrands);
  const models = useSelector(selectModels);
  const years = useSelector(selectYears);
  const engines = useSelector(selectEngines);

  const optionList = optionsItem.data;
  const optionIsLoading = optionsItem.isLoading;

  const wrapperClassName = cn(
    { [styles.isOpen]: isOpenPopover },
    styles.wrapper,
  );

  const handleClose = () => {
    setActiveStep(StepInputs.INACTIVE);
  };

  useEffect(() => {
    const dataByStepId = {
      [StepInputs.BRAND]: brands,
      [StepInputs.MODEL]: models,
      [StepInputs.YEAR]: years,
      [StepInputs.ENGINE]: engines,
    };

    const data: ListOptionsItem = dataByStepId[inputStepId];

    setOptionsItem(data);
  }, [inputStepId, brands, models, years, engines]);

  useEffect(() => {
    setIsLoading(optionIsLoading);
  }, [optionIsLoading, setIsLoading]);

  return (
    <Box component='div' className={wrapperClassName}>
      <Box
        component='div'
        className={styles.background}
        onClick={handleClose}
      ></Box>
      <Box component='div' className={styles.list}>
        {optionIsLoading
          ? null
          : optionList.map((item) => (
              <Button
                className={styles.button}
                onClick={() => {
                  handleClick({
                    title: item.title,
                    slug: item.slug,
                    inputStepId,
                  });
                }}
                key={item.slug}
              >
                {item.title}
              </Button>
            ))}
      </Box>
    </Box>
  );
};
