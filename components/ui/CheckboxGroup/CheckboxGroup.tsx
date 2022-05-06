import React, { useCallback, useEffect } from 'react';

import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import { useRouterQuery } from 'hooks/useRouterQuery';
import { CheckboxValue } from 'api/models/catalog';
import { Filter } from 'types';

import styles from './checkboxGroup.module.scss';

const CheckboxGroup: React.FC<Filter> = ({ filter, setFilterRequest }) => {
  const { updateQueryOption, getQueryOption, removeQuery } = useRouterQuery();

  const { title, slug, values } = filter;

  const queryOption = getQueryOption(slug);

  useEffect(() => {
    if (queryOption) {
      const options = Array.isArray(queryOption) ? queryOption : [queryOption];

      setFilterRequest((filterRequest) => ({
        ...filterRequest,
        [slug]: options,
      }));
      return;
    }

    setFilterRequest((filterRequest) => ({
      ...filterRequest,
      [slug]: [],
    }));
  }, [setFilterRequest, queryOption, slug]);

  const setOnChange = (checked: boolean, { value }: CheckboxValue) => {
    if (!checked) {
      removeQuery(slug, value);

      return;
    }

    updateQueryOption(slug, value);
  };

  const getIsChecked = useCallback(
    (name: string) => {
      if (!name) {
        return;
      }

      if (!Array.isArray(queryOption)) {
        const isChecked = queryOption === name;

        return isChecked;
      }

      const isChecked = Boolean(
        queryOption.find((element) => element === name),
      );

      return isChecked;
    },
    [queryOption],
  );

  return (
    <FormControl component='div' className={styles.checkboxContainer}>
      <FormLabel focused={false} id={slug} className={styles.title}>
        {title}
      </FormLabel>
      {values?.map((element: CheckboxValue) => {
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
              />
            }
            label={title}
          />
        );
      })}
    </FormControl>
  );
};

export { CheckboxGroup };
