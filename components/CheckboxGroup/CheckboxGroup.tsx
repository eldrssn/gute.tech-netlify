import React, { useCallback } from 'react';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import useRouterQuery from '../../hooks/useRouterQuery/useRouterQuery';
import { CheckboxGroupProps, CheckboxOption } from './types';

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  title,
  queryName,
  options,
}) => {
  const router = useRouter();
  const routerQuery = useRouterQuery();

  const setOnChange = useCallback(
    (checked: boolean, element: CheckboxOption) => {
      const { name } = element;

      if (!checked) {
        routerQuery.remove(queryName, name);
        return;
      }

      routerQuery.create(queryName, name);
    },
    [router.isReady, router.query],
  );

  const getIsChecked = (name: string) => {
    const queryOption = routerQuery.get(queryName);

    if (!Array.isArray(queryOption)) {
      return queryOption === name;
    }

    return Boolean(queryOption.find((element) => element === name));
  };

  return (
    <Box component='div' sx={{ width: '100%' }}>
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
