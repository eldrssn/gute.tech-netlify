import React from 'react';

import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

import { useRouterQuery } from 'hooks/useRouterQuery';
import { getQueryParams, setQueryParam } from 'hooks/useRouterQuery/helpers';
import { Filter } from 'types';

import styles from './ranger.module.scss';

export const Ranger: React.FC<Filter> = ({ filter }) => {
  const routerQuery = useRouterQuery();

  const { title, slug, min, max } = filter;

  const minValueQuery = `min${slug}`;
  const maxValueQuery = `max${slug}`;

  const setMinValue = setQueryParam(routerQuery, minValueQuery);
  const setMaxValue = setQueryParam(routerQuery, maxValueQuery);

  const minValue = getQueryParams(routerQuery, minValueQuery);
  const maxValue = getQueryParams(routerQuery, maxValueQuery);

  const checkValue = (max?: null | string) => (max ? max : undefined);
  return (
    <>
      <FormLabel id={slug} className={styles.title}>
        {title}
      </FormLabel>

      <Box className={styles.price_range_wrapper} component='div'>
        <TextField
          onChange={setMinValue}
          type='number'
          variant='outlined'
          defaultValue={minValue || checkValue(min)}
          placeholder='От'
          sx={{
            flexGrow: 1,
            '& input': {
              height: '20px',
              width: '100%',
              padding: '5px 12px',
              flexGrow: 1,
            },
          }}
        />

        <span className={styles.range_separator} />

        <TextField
          onChange={setMaxValue}
          type='number'
          variant='outlined'
          placeholder='До'
          defaultValue={maxValue || checkValue(max)}
          sx={{
            flexGrow: 1,
            '& input': {
              height: '20px',
              width: '100%',
              padding: '5px 12px',
            },
          }}
        />
      </Box>
    </>
  );
};
