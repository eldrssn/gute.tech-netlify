import React, { useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

import { useRouterQuery } from 'hooks/useRouterQuery';
import { getQueryParams } from 'hooks/useRouterQuery/helpers';
import { DELAY } from 'constants/variables';
import { Filter } from 'types';

import { checkValueExists, checkValuesCorrect } from './helpers';
import styles from './ranger.module.scss';

const Ranger: React.FC<Filter> = ({
  filter,
  setFiltersRequest,
  handleAnchorClick,
}) => {
  const routerQuery = useRouterQuery();
  const [isCorrectValue, setIsCorrectValue] = useState(true);

  const { title, slug, min, max } = filter;

  const minValueQuery = `min${slug}`;
  const maxValueQuery = `max${slug}`;

  const minValue = getQueryParams(routerQuery, minValueQuery);
  const maxValue = getQueryParams(routerQuery, maxValueQuery);

  const minRefInput = useRef<HTMLInputElement>();
  const maxRefInput = useRef<HTMLInputElement>();

  const setMinValue = debounce((event: ChangeEvent) => {
    const { value } = event.target;

    setFiltersRequest((filtersRequest) => ({
      ...filtersRequest,
      [slug]: [Number(value), Number(maxValue || max || '99999999')],
    }));
  }, DELAY);

  const setMaxValue = debounce((event: ChangeEvent) => {
    const { value } = event.target;

    setFiltersRequest((filtersRequest) => ({
      ...filtersRequest,
      [slug]: [Number(minValue || min || '0'), Number(value)],
    }));
  }, DELAY);

  const validateValues = useCallback(() => {
    const isValid = checkValuesCorrect({
      min: minValue || min,
      max: maxValue || max,
    });

    setIsCorrectValue(isValid);
  }, [minValue, maxValue, min, max]);

  useEffect(() => {
    validateValues();

    if (!minRefInput.current || !maxRefInput.current) {
      return;
    }

    if (!isCorrectValue) {
      setFiltersRequest((filtersRequest) => ({
        ...filtersRequest,
        [slug]: [],
      }));
      return;
    }

    if (!minValue || !maxValue) {
      minRefInput.current.value = String(min);
      maxRefInput.current.value = String(max);
    }

    if (minValue || maxValue) {
      setFiltersRequest((filtersRequest) => ({
        ...filtersRequest,
        [slug]: [
          Number(minValue || min || '0'),
          Number(maxValue || max || '99999999'),
        ],
      }));
    }
  }, [
    slug,
    minValue,
    maxValue,
    setFiltersRequest,
    min,
    max,
    isCorrectValue,
    validateValues,
  ]);

  return (
    <>
      <FormLabel id={slug} className={styles.title}>
        {title}
      </FormLabel>
      <Box
        className={styles.price_range_wrapper}
        component='div'
        onClick={handleAnchorClick}
      >
        <Box className={styles.price_ranges}>
          <TextField
            inputRef={minRefInput}
            onChange={setMinValue}
            type='number'
            variant='outlined'
            defaultValue={minValue || checkValueExists(min)}
            placeholder='От'
            sx={{
              flexGrow: 1,
              '& input': {
                height: '20px',
                width: '100%',
                padding: '5px 12px',
                border: isCorrectValue ? 'inherit' : '1px solid red',
                flexGrow: 1,
              },
            }}
          />

          <span className={styles.range_separator} />

          <TextField
            inputRef={maxRefInput}
            onChange={setMaxValue}
            type='number'
            variant='outlined'
            placeholder='До'
            defaultValue={maxValue || checkValueExists(max)}
            sx={{
              flexGrow: 1,
              '& input': {
                height: '20px',
                width: '100%',
                padding: '5px 12px',
                border: isCorrectValue ? 'inherit' : '1px solid red',
              },
            }}
          />
        </Box>

        {!isCorrectValue && (
          <span className={styles.warningMessage}>Неверный диапазон</span>
        )}
      </Box>
    </>
  );
};

export { Ranger };
