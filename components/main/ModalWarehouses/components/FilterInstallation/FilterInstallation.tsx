import React, { FC } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { FilterInstallationProps } from './types';

const FilterInstallation: FC<FilterInstallationProps> = ({
  setWithInstall,
  setWithoutIntall,
}) => (
  <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
    <FormControlLabel
      control={
        <Checkbox
          defaultChecked
          onChange={() => setWithInstall((value) => !value)}
        />
      }
      label='С установкой'
    />
    <FormControlLabel
      control={
        <Checkbox
          defaultChecked
          onChange={() => setWithoutIntall((value) => !value)}
        />
      }
      label='Без установки'
    />
  </FormGroup>
);

export { FilterInstallation };
