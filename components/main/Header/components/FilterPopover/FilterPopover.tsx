import React, { FC } from 'react';

import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import { Props } from './types';

export const FilterPopover: FC<Props> = ({
  anchorEl,
  setAnchorEl,
  setCarDetails,
  carDetails,
}) => {
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  function handleClose() {
    setAnchorEl(null);
  }

  function handleChange() {
    if (anchorEl) {
      setCarDetails({ ...carDetails, [anchorEl.id]: 'new value' });
    }

    handleClose();
  }

  return (
    <Popover
      disableScrollLock
      id={id}
      open={open}
      onClose={handleClose}
      disableAutoFocus
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Typography>The content of the Popover.</Typography>
      <Button onClick={handleChange}>next</Button>
    </Popover>
  );
};
