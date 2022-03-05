import React from 'react';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import useRouterQuery from 'hooks/useRouterQuery';

import { CheckboxGroupProps, CheckboxOption } from './types';

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  title,
  queryName,
  options,
}) => {
  const routerQuery = useRouterQuery();

  const setOnChange = (checked: boolean, element: CheckboxOption) => {
    const { name } = element;

    if (!checked) {
      routerQuery.removeQuery(queryName, name);
      return;
    }

    routerQuery.updateQueryOption(queryName, name);
  };

  const getIsChecked = (name: string) => {
    const queryOption = routerQuery.getQueryOption(queryName);

    if (!Array.isArray(queryOption)) {
      const isChecked = queryOption === name;
      return isChecked;
    }

    const isChecked = Boolean(queryOption.find((element) => element === name));

    return isChecked;
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
