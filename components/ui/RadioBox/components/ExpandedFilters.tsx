import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { Filters } from './Filters';
import { FiltersProps } from '../types';

import styles from '../radioBox.module.scss';

const ExpandedFilters: FC<FiltersProps> = ({
  filters,
  setOnChange,
  getIsChecked,
  handleAnchorClick,
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);
  };

  return (
    <>
      <TextField
        className={styles.textfield}
        placeholder='Найти'
        onChange={(event) => handleChangeInput(event)}
        value={searchValue}
      />

      <Box className={styles.expandFilterList}>
        <Filters
          filters={filters}
          setOnChange={setOnChange}
          getIsChecked={getIsChecked}
          handleAnchorClick={handleAnchorClick}
          searchValue={searchValue}
        />
      </Box>
    </>
  );
};

export { ExpandedFilters };
