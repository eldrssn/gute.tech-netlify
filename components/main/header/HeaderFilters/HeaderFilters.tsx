import React, { useState, MutableRefObject } from 'react';

import { Box, Typography, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';

import HeaderNavMenu from 'components/main/header/HeaderNavMenu';

import { InputIds, InputId, CarModel, HeaderFilterProps } from './types';

const SelectedCar: React.FC<CarModel> = (props) => <span>{props.car}</span>;

const HeaderFilters: React.FC<HeaderFilterProps> = (props) => {
  const [anchorElId, setAnchorElId] = React.useState<null | InputId>(null);
  const [car, setCar] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [isOpenFilters, setOpenFilters] = useState<boolean>(true);
  const [selectedCars, setSelectedCars] = useState<CarModel[]>([]);
  const { isFullMenu } = props;

  //MEMOIZE
  const refs: Record<InputId, MutableRefObject<HTMLElement | null>> = {
    [InputIds.HEADER_CAR_SELECTION]: React.useRef<null | HTMLElement>(null),
    [InputIds.HEADER_MODEL_SELECTION]: React.useRef<null | HTMLElement>(null),
    [InputIds.HEADER_YEAR_SELECTION]: React.useRef<null | HTMLElement>(null),
  };

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { id } = event.target as HTMLElement;
    if (id) {
      const newId = InputIds[id as InputId];
      setAnchorElId(newId);
    }
  }

  function handleClose() {
    setAnchorElId(null);
  }

  const openFilters = () => setOpenFilters(true);
  const closeFilters = () => setOpenFilters(false);

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

    setOpenFilters(false);
    setCar('');
    setModel('');
    setYear('');
    setSelectedCars((cars) => [...cars, newSelectedCar]);
  };

  const onFocus = (event: ChangeEvent) => {
    console.log('onFocus: ', event.target.value);
  };

  const onChangeCar = (event: ChangeEvent) => setCar(event.target.value);

  const onChangeModel = (event: ChangeEvent) => setModel(event.target.value);

  const onChangeYear = (event: ChangeEvent) => setYear(event.target.value);

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
      <Box
        sx={{
          display: isOpenFilters ? 'none' : 'flex',
          flexWrap: 'wrap',
        }}
      >
        {selectedCars.map((car, index) => (
          <SelectedCar key={index} {...car} />
        ))}
        <Button onClick={openFilters} variant='text'>
          Добавить авто
        </Button>
      </Box>
      <Box
        sx={{
          display: isOpenFilters ? 'flex' : 'none',
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
        <Typography
          sx={{ width: '100%', display: isFullMenu ? 'block' : 'none' }}
          component='span'
          gutterBottom
        >
          Воспользуйтесь фильтром и сайт автоматически подберёт подходящие
          детали для вашего транспорта
        </Typography>
        <TextField
          id={InputIds.HEADER_CAR_SELECTION}
          inputRef={refs[InputIds.HEADER_CAR_SELECTION]}
          label='Filled success'
          color='secondary'
          value={car}
          focused={Boolean(car) || anchorElId === InputIds.HEADER_CAR_SELECTION}
          onChange={onChangeCar}
          onFocus={onFocus}
          onClick={handleClick}
        />
        <TextField
          id={InputIds.HEADER_MODEL_SELECTION}
          inputRef={refs[InputIds.HEADER_MODEL_SELECTION]}
          label='Filled success'
          color='secondary'
          value={model}
          focused={
            Boolean(model) || anchorElId === InputIds.HEADER_MODEL_SELECTION
          }
          onChange={onChangeModel}
          onFocus={onFocus}
          onClick={handleClick}
        />
        <TextField
          id={InputIds.HEADER_YEAR_SELECTION}
          inputRef={refs[InputIds.HEADER_YEAR_SELECTION]}
          label='Filled success'
          color='secondary'
          value={year}
          focused={
            Boolean(year) || anchorElId === InputIds.HEADER_YEAR_SELECTION
          }
          onChange={onChangeYear}
          onFocus={onFocus}
          onClick={handleClick}
        />
        <Button onClick={addCar} variant='contained'>
          Подобрать детали
        </Button>
        {Boolean(selectedCars.length) && (
          <Button onClick={closeFilters} variant='text'>
            Отменить
          </Button>
        )}

        {!isFullMenu && <HeaderNavMenu />}

        <Popover
          disableScrollLock
          id={id}
          open={open}
          onClose={handleClose}
          disableAutoFocus
          anchorEl={(anchorElId && refs[anchorElId].current) || null}
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

      {!isFullMenu && !isOpenFilters && <HeaderNavMenu />}
    </Box>
  );
};

export default HeaderFilters;
