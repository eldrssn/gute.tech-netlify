import React, { FC, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';

import {
  selectBrands,
  selectModels,
  selectYears,
  selectEngines,
} from 'store/reducers/transport/selectors';
import Modal from 'components/main/Modal';

import { Props } from './types';
import { ListOptionsItemData } from 'types/transportStore';
import { StepInputs } from '../../types';
import styles from './styles.module.scss';

export const FilterPopover: FC<Props> = ({
  isOpenPopover,
  setActiveStep,
  inputStepId,
  handleClick,
}) => {
  const [optionsList, setOptionsList] = useState<ListOptionsItemData[]>([]);

  const brands = useSelector(selectBrands);
  const models = useSelector(selectModels);
  const years = useSelector(selectYears);
  const engines = useSelector(selectEngines);

  useEffect(() => {
    if (inputStepId === StepInputs.BRAND) {
      setOptionsList(brands);
    }

    if (inputStepId === StepInputs.MODEL) {
      setOptionsList(models);
    }

    if (inputStepId === StepInputs.YEAR) {
      setOptionsList(years);
    }

    if (inputStepId === StepInputs.ENGINE) {
      setOptionsList(engines);
    }
  }, [inputStepId, brands, models, years, engines]);

  const handleClose = () => {
    setActiveStep(StepInputs.INACTIVE);
  };

  return (
    <Modal isOpen={isOpenPopover} setIsOpen={handleClose}>
      <Box component='div' className={styles.wrap}>
        {optionsList.map((item) => (
          <Button
            className={styles.button}
            onClick={() => {
              handleClick({ title: item.title, slug: item.slug, inputStepId });
            }}
            key={item.slug}
          >
            {item.title}
          </Button>
        ))}
      </Box>
    </Modal>
  );
};
