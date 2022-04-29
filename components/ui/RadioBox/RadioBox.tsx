import React, { useCallback } from 'react';

import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { useRouterQuery } from 'hooks/useRouterQuery';
import { setQueryParam } from 'hooks/useRouterQuery/helpers';
import { Filter } from 'types';

import styles from './radioGroup.module.scss';

export const RadioBox: React.FC<Filter> = ({ filter }) => {
  const routerQuery = useRouterQuery();

  const { title, slug, values } = filter;

  const onChange = setQueryParam(routerQuery, slug);

  const getIsChecked = useCallback(
    (name: string) => {
      const queryOption = routerQuery.getQueryOption(slug);

      if (!Array.isArray(queryOption)) {
        const isChecked = queryOption === name;

        return isChecked;
      }

      const isChecked = Boolean(
        queryOption.find((element) => element === name),
      );

      return isChecked;
    },
    [routerQuery, slug],
  );

  return (
    <FormControl component='div' className={styles.radioBoxContainer}>
      <FormLabel focused={false} id='radio' className={styles.title}>
        {title}
      </FormLabel>
      <RadioGroup>
        {values?.map(({ title }) => (
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
            key={title}
            control={
              <Radio onChange={onChange} checked={getIsChecked(title)} />
            }
            label={title}
            value={title}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
