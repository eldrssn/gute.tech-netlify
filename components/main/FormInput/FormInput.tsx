import React from 'react';
import { useController } from 'react-hook-form';
import { TextField } from '@mui/material';

import patternsType from 'consts/patternType';

import { FormInputProps } from './types';

const FormInput = <TFormValue extends Record<string, unknown>>({
  name,
  control,
  label,
  patternType,
}: FormInputProps<TFormValue>): JSX.Element => {
  const rules = {
    required: 'Обязательное поле',
    pattern: {
      value: patternsType[patternType].pattern,
      message: patternsType[patternType].message,
    },
  };
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: rules,
  });

  return (
    <TextField
      sx={{ width: '100%' }}
      helperText={error?.message}
      error={Boolean(error)}
      onChange={onChange}
      value={value}
      fullWidth
      label={label}
      variant='outlined'
    />
  );
};

export default FormInput;
