import React, { useState } from 'react';

import { Box, Typography, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';

import { INPUT_IDS, CarModel } from './types';
import initialState from './initialState';

const HeaderFilters: React.FC = () => {
  const refs = initialState.useLocalRefs();
  const [anchorElId, setAnchorElId] = React.useState<null | string>(null);
  const [car, setCar] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [year, setYear] = useState<string>('');

  const [selectedCars, setSelectedCars] = useState<CarModel[]>([]);

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { id } = event.target as HTMLElement;
    if (id) {
      setAnchorElId(id);
    }
  }

  function handleClose() {
    setAnchorElId(null);
  }

  const addCar = () => {
    if (!car || !model || !year) {
      //TODO: Handle empty parameters
      return;
    }
    const newSelectedCar = {
      car,
      model,
      year,
    };

    setCar('');
    setModel('');
    setYear('');
    setSelectedCars((cars) => [...cars, newSelectedCar]);
  };

  const onFocus = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {};

  const onChangeCar = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => setCar(event.target.value);

  const onChangeModel = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => setModel(event.target.value);

  const onChangeYear = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => setYear(event.target.value);

  const open = Boolean(anchorElId);
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
        id={INPUT_IDS.CAR_SELECTION_ID}
        inputRef={refs[INPUT_IDS.CAR_SELECTION_ID]}
        label='Filled success'
        color='secondary'
        value={car}
        focused={Boolean(car) || anchorElId === INPUT_IDS.CAR_SELECTION_ID}
        onChange={onChangeCar}
        onFocus={onFocus}
        onClick={handleClick}
      />
      <TextField
        id={INPUT_IDS.MODEL_SELECTION_ID}
        inputRef={refs[INPUT_IDS.MODEL_SELECTION_ID]}
        label='Filled success'
        color='secondary'
        value={model}
        focused={Boolean(model) || anchorElId === INPUT_IDS.MODEL_SELECTION_ID}
        onChange={onChangeModel}
        onFocus={onFocus}
        onClick={handleClick}
      />
      <TextField
        id={INPUT_IDS.YEAR_SELECTION_ID}
        inputRef={refs[INPUT_IDS.YEAR_SELECTION_ID]}
        label='Filled success'
        color='secondary'
        value={year}
        focused={Boolean(year) || anchorElId === INPUT_IDS.YEAR_SELECTION_ID}
        onChange={onChangeYear}
        onFocus={onFocus}
        onClick={handleClick}
      />
      <Button onClick={addCar} variant='contained'>
        Подобрать детали
      </Button>

      <Popover
        disableScrollLock
        id={id}
        open={open}
        onClose={handleClose}
        disableAutoFocus
        anchorEl={
          (anchorElId && refs[anchorElId as keyof typeof refs].current) || null
        }
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
