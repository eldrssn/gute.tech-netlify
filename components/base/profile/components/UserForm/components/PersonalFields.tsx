import React, { FC } from 'react';
import { Box, FormLabel, MenuItem, TextField } from '@mui/material';

import { FormTextfield } from 'components/ui/FormTextfield';

import { selectCity, usernameRule } from '../constants';
import { PersonalFieldsProps } from '../types';

import styles from '../userForm.module.scss';

// !TODO: раскомментировать поля, когда никнейм, страну и город добавят на бэк
const PersonalFields: FC<PersonalFieldsProps> = ({
  onChangeForm,
  // register,
  // errors,
  // getValues,
  // handleChangeFormValue,
}) => (
  <Box className={styles.formColumn} sx={{ width: { xs: '100%', md: '50%' } }}>
    <FormLabel className={styles.formLabel}>Публичные данные</FormLabel>

    <FormTextfield
      label='Никнейм'
      rule={usernameRule}
      placeholder='Введите никнейм'
      disabled
      // register={register}
      // name='username'
      // error={Boolean(errors.username)}
      // errorMessage={errors.username?.message}
      // onChange={(event) => handleChangeFormValue(event, 'username')}
    />

    <FormTextfield
      label='Страна'
      placeholder='Введите страну'
      onChange={onChangeForm}
      disabled
      // register={register}
      // name='country'
    />

    <TextField
      className={styles.inputField}
      select
      label='Город'
      value=''
      placeholder='Введите город'
      disabled
      // name='city'
      // value={getValues('city')}
      // onChange={(event) => handleChangeFormValue(event, 'city')}
    >
      {selectCity.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  </Box>
);

export { PersonalFields };
