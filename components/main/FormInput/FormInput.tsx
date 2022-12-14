import React from 'react';
import TextField from '@mui/material/TextField';

import { FormInputProps } from './types';

const FormInput: React.FC<FormInputProps> = ({
  helperText,
  label,
  onChange,
  value,
  isError,
  isAutocomplete,
  children,
  textarea,
  maxLength = 200,
  hideValue,
  type = 'text',
  id,
}) => (
  <TextField
    autoComplete={isAutocomplete ? 'on' : 'off'}
    sx={{ width: '100%' }}
    helperText={helperText}
    error={isError}
    onChange={onChange}
    value={value}
    type={hideValue ? 'password' : type}
    fullWidth
    label={label}
    variant='outlined'
    multiline={textarea}
    rows={textarea ? 4 : undefined}
    inputProps={{ maxLength: maxLength }}
    id={id}
  >
    {children}
  </TextField>
);

export { FormInput };
