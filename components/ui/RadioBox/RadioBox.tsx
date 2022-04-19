import React, { useCallback } from 'react';

import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { useRouterQuery } from 'hooks/useRouterQuery';
import { setQueryParam } from 'hooks/useRouterQuery/helpers';

import { RadioGroupProps } from './types';

import styles from './radioGroup.module.scss';

export const RadioBox: React.FC<RadioGroupProps> = ({
  title,
  queryName,
  options,
}) => {
  const routerQuery = useRouterQuery();

  const onChange = setQueryParam(routerQuery, queryName);

  const getIsChecked = useCallback(
    (name: string) => {
      const queryOption = routerQuery.getQueryOption(queryName);

      if (!Array.isArray(queryOption)) {
        const isChecked = queryOption === name;

        return isChecked;
      }

      const isChecked = Boolean(
        queryOption.find((element) => element === name),
      );

      return isChecked;
    },
    [routerQuery, queryName],
  );

  return (
    <FormControl component='div' className={styles.radioBoxContainer}>
      <FormLabel id='radio' className={styles.title}>
        {title}
      </FormLabel>
      <RadioGroup>
        {options.map(({ name, displayName }) => (
          <FormControlLabel
            key={name}
            control={<Radio onChange={onChange} checked={getIsChecked(name)} />}
            label={displayName}
            value={name}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
