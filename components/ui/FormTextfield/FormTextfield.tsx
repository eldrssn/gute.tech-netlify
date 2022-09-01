import React, { FC } from 'react';
import { FormHelperText, TextField } from '@mui/material';

import { FormTextfieldProps } from './types';
import styles from './fromTextfields.module.scss';

const FormTextfield: FC<FormTextfieldProps> = ({
  register,
  name,
  label,
  error,
  onChange,
  onBlur,
  required,
  placeholder,
  rule,
  disabled,
  onClick,
  errorMessage,
  inputProps,
  onKeyPress,
}) => {
  const isMockField = name && register;

  return isMockField ? (
    <>
      <TextField
        className={styles.inputField}
        label={label}
        {...register(name, rule)}
        placeholder={placeholder}
        error={error}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
        onClick={onClick}
        inputProps={inputProps}
        onKeyPress={onKeyPress}
      />
      {error && (
        <FormHelperText error className={styles.inputField_error}>
          {errorMessage}
        </FormHelperText>
      )}
    </>
  ) : (
    <TextField
      className={styles.inputField}
      label={label}
      placeholder={placeholder}
      error={error}
      onChange={onChange}
      onBlur={onBlur}
      required={required}
      disabled={disabled}
      onClick={onClick}
    />
  );
};

export { FormTextfield };
