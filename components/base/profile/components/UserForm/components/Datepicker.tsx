import React, { FC, useEffect } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { FormHelperText, TextField } from '@mui/material';

import {
  checkCorrectDate,
  checkValidDate,
  cutDate,
  formatDate,
  getDate,
  validateMaxAge,
  validateMinAge,
} from '../helpers';

import {
  DATE_INPUT_FORMAT,
  DATE_INPUT_MASK,
  MAX_DATE,
  MIN_DATE,
  ProfileFields,
} from '../constants';

import { DatepickerProps } from '../types';
import styles from '../userForm.module.scss';

const Datepicker: FC<DatepickerProps> = ({
  getValues,
  setValue,
  errors,
  register,
  onChangeForm,
}) => {
  const defaultDateOfBirthday = getValues(ProfileFields.DATE_OF_BIRTHDAY);

  const dateValue = getDate(defaultDateOfBirthday);

  const [dateOfBirth, setDateOfBirth] = React.useState<Date | null>(dateValue);

  useEffect(() => {
    const isValidDate = dateOfBirth && checkValidDate(dateOfBirth);

    if (!isValidDate) {
      return;
    }

    const transformDate = cutDate(dateOfBirth);
    setValue(ProfileFields.DATE_OF_BIRTHDAY, transformDate, {
      shouldDirty: true,
    });
  }, [dateOfBirth, setValue, register]);

  const handleTransformDate = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = event.target;

    if (!errors[ProfileFields.DATE_OF_BIRTHDAY]) {
      const inputDate = formatDate(value);
      setDateOfBirth(inputDate);
    }
  };

  const handleChangeDateOfBirth = (value: Date | null) => {
    onChangeForm();
    setDateOfBirth(value);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
        <DatePicker
          value={dateOfBirth}
          inputFormat={DATE_INPUT_FORMAT}
          onChange={handleChangeDateOfBirth}
          label='Дата рождения'
          disableFuture
          mask={DATE_INPUT_MASK}
          maxDate={MAX_DATE}
          minDate={MIN_DATE}
          disableHighlightToday
          renderInput={(params) => (
            <TextField
              className={styles.inputField}
              placeholder='Выберете дату рождения'
              {...params}
              error={Boolean(errors[ProfileFields.DATE_OF_BIRTHDAY])}
              {...register('date_of_birthday', {
                validate: {
                  isDateCorrect: checkCorrectDate,
                  min: validateMinAge,
                  max: validateMaxAge,
                },
                onBlur: handleTransformDate,
              })}
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
