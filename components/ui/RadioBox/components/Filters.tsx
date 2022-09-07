import React, { FC } from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

import { filterFilters } from 'components/ui/CheckboxGroup/helpers';

import { FiltersProps } from '../types';
import styles from '../radioBox.module.scss';

const Filters: FC<FiltersProps> = ({
  searchValue,
  filters,
  setOnChange,
  getIsChecked,
  handleAnchorClick,
}) => {
  const filtredFilters = searchValue
    ? filterFilters(searchValue, filters)
    : filters;

  if (filtredFilters?.length === 0) {
    return <p className={styles.noFoundLabel}>Ничего не найдено</p>;
  }
  return (
    <RadioGroup>
      {filtredFilters?.map(({ title, value }) => (
        <FormControlLabel
          sx={{
            '& Mui-FormLabel-root.Mui-focused': { color: 'black' },
            '& .MuiFormControlLabel-label': {
              fontWeight: 700,
              fontSize: '14px',
              lineHeight: 1.57,
              color: 'black',
              fontFamily: 'inherit',
            },
            '& .MuiRadio-root': {
              padding: '5px',
              paddingLeft: '8px',
            },
          }}
          key={value}
          control={
            <Radio
              onChange={setOnChange}
              checked={getIsChecked(value)}
              onClick={handleAnchorClick}
            />
          }
          label={title}
          value={value}
        />
      ))}
    </RadioGroup>
  );
};

export { Filters };
