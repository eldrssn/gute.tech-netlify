import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { FormHelperText, TextField } from '@mui/material';

import {
  DATE_INPUT_FORMAT,
  MAX_DATE,
  MIN_DATE,
  ProfileFields,
} from '../constants';
import { validateMinAge, validateMaxAge } from '../helpers';

import { DatepickerProps } from '../types';
import styles from '../userForm.module.scss';

const Datepicker: FC<DatepickerProps> = ({ errors, control, onChangeForm }) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
        <Controller
          name='date_of_birthday'
          control={control}
          rules={{ validate: { validateMinAge, validateMaxAge } }}
          render={({ field }) => (
            <DatePicker
              onChange={(date) => {
                if (date) {
                  field.onChange(date);
                  onChangeForm();
                }
              }}
              value={field.value}
              inputFormat={DATE_INPUT_FORMAT}
              renderInput={(params) => (
                <TextField className={styles.inputField} {...params} />
              )}
              label='Дата рождения'
              maxDate={MAX_DATE}
              minDate={MIN_DATE}
              disableHighlightToday
              disableFuture
            />
          )}
        />
      </LocalizationProvider>

      {errors[ProfileFields.DATE_OF_BIRTHDAY] && (
        <FormHelperText error className={styles.inputField_error}>
          {errors[ProfileFields.DATE_OF_BIRTHDAY]?.message}
        </FormHelperText>
      )}
    </>
  );
};

export { Datepicker };
