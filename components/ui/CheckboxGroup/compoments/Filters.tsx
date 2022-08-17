import React, { FC } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { CheckboxValue } from 'api/models/catalog';

import { filterFilters } from '../helpers';
import { FiltersProps } from '../types';
import styles from '../checkboxGroup.module.scss';

const Filters: FC<FiltersProps> = ({
  filters,
  searchValue,
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
    <>
      {filtredFilters?.map((element: CheckboxValue) => {
        const { title, value } = element;

        return (
          <FormControlLabel
            key={value}
            sx={{
              '& .MuiFormControlLabel-label': {
                fontWeight: 700,
                fontSize: '14px',
                lineHeight: 1.57,
                color: 'black',
                fontFamily: 'inherit',
              },
              '& .MuiCheckbox-root': {
                padding: '5px',
                paddingLeft: '8px',
              },
            }}
            control={
              <Checkbox
                onChange={(event, checked) => setOnChange(checked, element)}
                checked={getIsChecked(value)}
                onClick={handleAnchorClick}
              />
            }
            label={title}
          />
        );
      })}
    </>
  );
};

export { Filters };
