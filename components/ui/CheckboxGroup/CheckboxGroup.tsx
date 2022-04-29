import React, { useCallback } from 'react';

import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import { useRouterQuery } from 'hooks/useRouterQuery';
import { Filter } from 'types';

import { CheckboxValue } from './types';

import styles from './checkboxGroup.module.scss';

export const CheckboxGroup: React.FC<Filter> = ({ filter }) => {
  const { updateQueryOption, getQueryOption, removeQuery } = useRouterQuery();

  const { title, slug, values } = filter;

  const setOnChange = (checked: boolean, { title }: CheckboxValue) => {
    if (!checked) {
      removeQuery(slug, title);
      return;
    }

    updateQueryOption(slug, title);
  };

  const getIsChecked = useCallback(
    (name: string) => {
      const queryOption = getQueryOption(slug);

      if (!Array.isArray(queryOption)) {
        const isChecked = queryOption === name;

        return isChecked;
      }

      const isChecked = Boolean(
        queryOption.find((element) => element === name),
      );

      return isChecked;
    },
    [getQueryOption, slug],
  );

  return (
    <FormControl component='div' className={styles.checkboxContainer}>
      <FormLabel focused={false} id={slug} className={styles.title}>
        {title}
      </FormLabel>
      {values?.map((element: CheckboxValue, index) => {
        const { title } = element;

        return (
          <FormControlLabel
            key={index}
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
                checked={getIsChecked(title)}
              />
            }
            label={element.title}
          />
        );
      })}
    </FormControl>
  );
};
