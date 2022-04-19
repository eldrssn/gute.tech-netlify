import React, { useCallback } from 'react';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import { useRouterQuery } from 'hooks/useRouterQuery';

import { CheckboxGroupProps, CheckboxOption } from './types';

import styles from './checkboxGroup.module.scss';

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  title,
  queryName,
  options,
}) => {
  const { updateQueryOption, getQueryOption, removeQuery } = useRouterQuery();

  const setOnChange = (checked: boolean, { name }: CheckboxOption) => {
    if (!checked) {
      removeQuery(queryName, name);
      return;
    }

    updateQueryOption(queryName, name);
  };

  const getIsChecked = useCallback(
    (name: string) => {
      const queryOption = getQueryOption(queryName);

      if (!Array.isArray(queryOption)) {
        const isChecked = queryOption === name;

        return isChecked;
      }

      const isChecked = Boolean(
        queryOption.find((element) => element === name),
      );

      return isChecked;
    },
    [getQueryOption, queryName],
  );

  return (
    <Box component='div' className={styles.checkboxContainer}>
      <FormLabel id={queryName} className={styles.title}>
        {title}
      </FormLabel>
      {options.map((element: CheckboxOption, index) => {
        const { name } = element;

        return (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                onChange={(event, checked) => setOnChange(checked, element)}
                checked={getIsChecked(name)}
              />
            }
            label={element.displayName}
          />
        );
      })}
    </Box>
  );
};
