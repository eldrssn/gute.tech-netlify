import React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { useRouterQuery } from 'hooks/useRouterQuery';
import { getQueryParams, setQueryParam } from 'hooks/useRouterQuery/helpers';

import { RangerProps } from './types';

import styles from './ranger.module.scss';

export const Ranger: React.FC<RangerProps> = ({ title, queryNames }) => {
  const routerQuery = useRouterQuery();

  const [minValueQuery, maxValueQuery] = queryNames;

  const setMinValue = setQueryParam(routerQuery, minValueQuery);
  const setMaxValue = setQueryParam(routerQuery, maxValueQuery);

  const minValue = getQueryParams(routerQuery, minValueQuery);
  const maxValue = getQueryParams(routerQuery, maxValueQuery);

  return (
    <>
      <p className={styles.title}>{title}</p>
      <Box className={styles.price_range_wrapper} component='div'>
        <TextField
          onChange={setMinValue}
          type='number'
          variant='outlined'
          value={minValue}
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
          value={maxValue}
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
