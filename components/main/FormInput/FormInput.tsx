import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { FormInputProps } from './types';

const FormInputText: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  pattern,
  errorMessagePattern,
}) => (
  <Controller
    name={name}
    control={control}
    rules={{ required: 'Обязательное поле', pattern: pattern }}
    render={({ field: { onChange, value }, fieldState: { error } }) => {
      const errroMessage =
        error?.type === 'pattern' ? errorMessagePattern : error?.message;

      return (
        <TextField
          sx={{ width: '100%' }}
          helperText={errroMessage}
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant='outlined'
        />
      );
    }}
  />
);

export default FormInputText;
