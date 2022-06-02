import React, { useCallback, useEffect } from 'react';

import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { useRouterQuery } from 'hooks/useRouterQuery';
import { setQueryParam } from 'hooks/useRouterQuery/helpers';
import { Filter } from 'types';

import styles from './radioGroup.module.scss';

const RadioBox: React.FC<Filter> = ({
  filter,
  setFilterRequest,
  handleAnchorClick,
}) => {
  const routerQuery = useRouterQuery();

  const { title, slug, values } = filter;

  const queryOption = routerQuery.getQueryOption(slug);

  const onChange = setQueryParam(routerQuery, slug, false);

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

  const getIsChecked = useCallback(
    (name: string) => {
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
    <FormControl component='div' className={styles.radioBoxContainer}>
      <FormLabel focused={false} id='radio' className={styles.title}>
        {title}
      </FormLabel>
      <RadioGroup>
        {values?.map(({ title, value }) => (
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
                onChange={onChange}
                checked={getIsChecked(value)}
                onClick={handleAnchorClick}
              />
            }
            label={title}
            value={value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export { RadioBox };
