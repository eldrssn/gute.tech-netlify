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
  const [isChecked, setChecked] = useState<{ [key: string]: boolean }>({});

  const setOnChange = useCallback(
    (checked: boolean, element: CheckboxOption) => {
      const { name } = element;
      const { query, pathname } = router;

      const queryOptions = {
        ...isChecked,
        [name]: checked,
      };

      const newQuery = Object.keys(queryOptions).filter(
        (option) => queryOptions[option],
      );

      router.push({
        pathname: pathname,
        query: {
          ...query,
          [queryName]: newQuery,
        },
      });

      setChecked(queryOptions);
    },
    [router, isChecked],
  );

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
        setChecked(newQuery);
      }
    }
  }, [router.isReady]);

  return (
    <Box component='div' sx={{ width: '100%  ' }}>
      {title && <p>{title} </p>}
      {options.map((element: CheckboxOption, index) => {
        const { name } = element;
        const isCheckedOption = isChecked[name] || false;
        return (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                onChange={(event, checked) => setOnChange(checked, element)}
                checked={isCheckedOption}
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
