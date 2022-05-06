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

import { FilterPopoverProps } from './types';
import { ListOptionsItem } from 'api/models/transport';
import { StepInputs } from '../../types';
import styles from './styles.module.scss';

const FilterPopover: FC<FilterPopoverProps> = ({
  isOpenPopover,
  setOpenPopoverId,
  inputStepId,
  handleClick,
  setIsLoadingOptionList,
}) => {
  const [activeOptionList, setActiveOptionsList] = useState<ListOptionsItem>({
    data: [],
    isLoading: false,
    error: {
      name: '',
      message: '',
    },
  });
  const { isLoading, data } = activeOptionList;

  const brands = useSelector(selectBrands);
  const models = useSelector(selectModels);
  const years = useSelector(selectYears);
  const engines = useSelector(selectEngines);

  useEffect(() => {
    const dataByStepId = {
      [StepInputs.BRAND]: brands,
      [StepInputs.MODEL]: models,
      [StepInputs.YEAR]: years,
      [StepInputs.ENGINE]: engines,
    };

    const data: ListOptionsItem = dataByStepId[inputStepId];

    setActiveOptionsList(data);
  }, [inputStepId, brands, models, years, engines]);

  useEffect(() => {
    setIsLoadingOptionList(isLoading);
  }, [isLoading, setIsLoadingOptionList]);

  const handleClose = () => {
    setOpenPopoverId(StepInputs.INACTIVE);
  };

  const wrapperClassName = cn(
    { [styles.isOpen]: isOpenPopover },
    styles.wrapper,
  );

  return (
    <Box component='div' className={wrapperClassName}>
      <Box
        component='div'
        className={styles.background}
        onClick={handleClose}
      ></Box>
      <Box component='div' className={styles.list}>
        {isLoading
          ? null
          : data.map((item) => (
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

export { FilterPopover };
