import React, { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { CheckboxGroupProps, CheckboxOption } from './interfaces';

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  title,
  queryName,
  options,
}) => {
  const router = useRouter();

  const setOnChange = useCallback(
    (checked: boolean, element: CheckboxOption) => {
      const { name } = element;
      const { query, pathname } = router;
      const isElementExist = query[queryName];

      if (checked && !isElementExist) {
        const newQuery = { ...query, [queryName]: element.name };
        router.push({
          pathname: pathname,
          query: newQuery,
        });

        return;
      }

      if (checked && isElementExist) {
        const isArray = Array.isArray(isElementExist);

        if (!isArray) {
          const newQuery = {
            ...query,
            [queryName]: [isElementExist, element.name],
          };
          router.push({
            pathname: pathname,
            query: newQuery,
          });

          return;
        }

        if (isArray) {
          const newQueryArray = isElementExist;
          newQueryArray.push(element.name);

          const newQuery = {
            ...query,
            [queryName]: newQueryArray,
          };

          router.push({
            pathname: pathname,
            query: newQuery,
          });
          return;
        }
      }

      if (!checked) {
        if (Array.isArray(isElementExist)) {
          const newQuery = {
            ...query,
            [queryName]: isElementExist.filter(
              (queryOption) => queryOption !== element.name,
            ),
          };

          router.push({
            pathname: pathname,
            query: newQuery,
          });

          return;
        }
        const newQuery = { ...query };
        delete newQuery[queryName];

        router.push({
          pathname: pathname,
          query: newQuery,
        });

        return;
      }
    },
    [router.isReady, router.query],
  );

  const getIsChecked = (name: string) => {
    const { query } = useRouter();

    const queryOption = query[queryName];
    const isArray = Array.isArray(queryOption);

    if (!isArray) {
      return queryOption === name;
    }

    return Boolean(queryOption.find((element) => element === name));
  };

  useEffect(() => {
    const queryOptions = router.query[queryName];

    if (queryOptions) {
      const queries =
        queryOptions && Array.isArray(queryOptions)
          ? queryOptions
          : queryOptions.split(',');

      if (queries) {
        const newQuery = queries.reduce((prev, accumulator) => {
          const queryOption = options.find(
            (option) => option.name === accumulator,
          );

          if (queryOption) {
            return {
              ...prev,
              [queryOption.name]: true,
            };
          }

          return prev;
        }, {});
      }
    }
  }, [router.isReady]);

  return (
    <Box component='div' sx={{ width: '100%  ' }}>
      {title && <p>{title} </p>}
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

export default CheckboxGroup;
