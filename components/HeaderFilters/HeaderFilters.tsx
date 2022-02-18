import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';
import {
  CAR_SELECTION_ID,
  MODEL_SELECTION_ID,
  YEAR_SELECTION_ID,
} from './constants';
import { FilterIds } from './interfaces';

const HeaderFilters: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | any>(null);
  // const divRef = React.useRef();
  const [car, setCar] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [year, setYear] = useState<string>('');

  function handleClick() {
    console.log('handle click');
    // if (divRef) {
    //   setAnchorEl(divRef.current);
    // }
  }

  function handleClose() {
    setAnchorEl(null);
  }
  const [focusedInputs, setfocusedInputs] = useState<
    Record<FilterIds, boolean>
  >({
    [CAR_SELECTION_ID]: false,
    [MODEL_SELECTION_ID]: false,
    [YEAR_SELECTION_ID]: false,
  });

  const onFocus = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { id } = event.currentTarget;
    const focused = focusedInputs[id as FilterIds];

    console.log(event);

    console.log('on focus', id);

    if (focused === undefined) {
      return;
    }

    const newfocusedInputs = Object.keys(focusedInputs).reduce<
      Record<FilterIds, boolean>
    >((acc, key) => {
      acc[key as FilterIds] = key === id;
      return acc;
    }, focusedInputs);

    console.log('Anchor el', anchorEl);

    setfocusedInputs({ ...newfocusedInputs });
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box
      sx={{
        paddingTop: '30px',
        paddingBottom: '30px',
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      <Typography sx={{ width: '100%' }} component='span' gutterBottom>
        Воспользуйтесь фильтром и сайт автоматически подберёт подходящие детали
        для вашего транспорта
      </Typography>
      <TextField
        id={CAR_SELECTION_ID}
        label='Filled success'
        color='secondary'
        onChange={(event) => setCar(event.target.value)}
        focused={Boolean(car) || focusedInputs[CAR_SELECTION_ID]}
        onFocus={onFocus}
        onClick={handleClick}
      />
      <TextField
        id={MODEL_SELECTION_ID}
        label='Filled success'
        color='secondary'
        onChange={(event) => setModel(event.target.value)}
        focused={Boolean(model) || focusedInputs[MODEL_SELECTION_ID]}
        onFocus={onFocus}
        onClick={handleClick}
      />
      <TextField
        id={YEAR_SELECTION_ID}
        label='Filled success'
        color='secondary'
        onChange={(event) => setYear(event.target.value)}
        focused={Boolean(year) || focusedInputs[YEAR_SELECTION_ID]}
        onFocus={onFocus}
        onClick={handleClick}
      />
      <Button variant='contained'>Подобрать детали</Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
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
      </Popover>
    </Box>
  );
};

export default HeaderFilters;
