import React, { FC } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import { useSelector } from 'react-redux';

import { selectBrands, selectModels } from 'store/reducers/content/selectors';
import { getModel } from 'api/getModel';

import { Props } from './types';

export const FilterPopover: FC<Props> = ({
  isOpenPopover,
  setActiveStep,
  step,
  handleClick,
  setIsOpenPopover,
}) => {
  const id = isOpenPopover ? 'simple-popover' : undefined;

  const brands = useSelector(selectBrands);
  const models = useSelector(selectModels);

  const handleClose = () => {
    setActiveStep(-1);
  };

  return (
    <Popover
      disableScrollLock
      id={id}
      open={isOpenPopover}
      onClose={handleClose}
      disableAutoFocus
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      {brands.map((item) => (
        <Button
          onClick={() => {
            handleClick(item.title);
          }}
          key={item.slug}
        >
          {item.title}
        </Button>
      ))}
    </Popover>
  );
};
