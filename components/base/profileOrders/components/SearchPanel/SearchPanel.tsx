import React, { FC } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import InputMask from 'react-input-mask';
import cn from 'classnames';

import { inputMasks } from 'constants/patterns';

import { Props } from './types';
import styles from './styles.module.scss';

const SearchPanel: FC<Props> = ({ searchValue, setSearchValue }) => {
  const handleClickCross = () => {
    setSearchValue('');
  };

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);
  };

  return (
    <Box className={cn(styles.searchBox)}>
      <InputMask
        mask={inputMasks.numberOrderMask}
        maskPlaceholder={null}
        value={searchValue ? searchValue : ''}
        onChange={handleChangeInput}
        autoComplete='off'
      >
        <TextField
          className={styles.textField}
          placeholder='Введите номер'
          value={searchValue}
        />
      </InputMask>
      {searchValue.length > 0 ? (
        <CloseIcon className={styles.icon} onClick={handleClickCross} />
      ) : (
        <SearchIcon className={styles.icon} />
      )}
    </Box>
  );
};

export { SearchPanel };
