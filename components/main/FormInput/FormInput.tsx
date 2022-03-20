import React from 'react';
import { TextField } from '@mui/material';

import { FormInputProps } from './types';

const FormInput: React.FC<FormInputProps> = ({
  helperText,
  label,
  onChange,
  value,
  isError,
}) => (
  <TextField
    sx={{ width: '100%' }}
    helperText={helperText}
    error={isError}
    onChange={onChange}
    value={value}
    fullWidth
    label={label}
    variant='outlined'
  />
);

export default FormInput;
