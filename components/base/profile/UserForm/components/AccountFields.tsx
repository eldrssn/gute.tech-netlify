import React, { FC } from 'react';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import {
  Box,
  FormHelperText,
  FormLabel,
  MenuItem,
  TextField,
} from '@mui/material';

import { FormTextfield } from 'components/ui/FormTextfield';

import {
  DATE_INPUT_FORMAT,
  DATE_INPUT_MASK,
  inputFullNameRule,
  MAX_DATE,
  MIN_DATE,
  selectSex,
  ProfileFields,
} from '../constants';
import {
  correctRegister,
  formatDate,
  validateMaxAge,
  validateMinAge,
} from '../helpers';
import { AccountFieldsProps, TFormDataFields } from '../types';

import styles from '../userForm.module.scss';

const AccountFields: FC<AccountFieldsProps> = ({
  register,
  onChangeForm,
  setValue,
  errors,
  trigger,
  getValues,
  handleChangeFormValue,
  handleOpenModalEmail,
}) => {
  const defaultDateOfBirthday = getValues(ProfileFields.DATE_OF_BIRTHDAY);

  const [dateOfBirth, setDateOfBirth] = React.useState<
    string | string[] | null
  >(defaultDateOfBirthday);

  const onBlurCorrectRegister = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
    title: TFormDataFields,
  ) => {
    const correctedRegister = correctRegister(event);
    setValue(title, correctedRegister);
    trigger(title);
  };

  const handleChangeDateOfBirth = (
    value: Date | null,
    keyboardInputValue?: string,
  ) => {
    onChangeForm();

    const stringifyDate = value?.toISOString().substring(0, 10) || '';

    if (!keyboardInputValue) {
      setValue(ProfileFields.DATE_OF_BIRTHDAY, stringifyDate, {
        shouldDirty: true,
      });
      setDateOfBirth(stringifyDate);
      return;
    }

    const formatedDate = formatDate(keyboardInputValue);
    setValue(ProfileFields.DATE_OF_BIRTHDAY, formatedDate);
    setDateOfBirth(formatedDate);
  };

  return (
    <>
      <Box
        className={styles.formColumn}
        sx={{ width: { xs: '100%', md: '50%' } }}
      >
        <FormLabel className={styles.formLabel}>Учетные данные</FormLabel>
        <FormTextfield
          register={register}
          label='Телефон'
          name={ProfileFields.PHONE_NUMBER}
          placeholder='Введите телефон'
          disabled
          required
        />
        <FormTextfield
          register={register}
          label='Email'
          name={ProfileFields.EMAIL}
          placeholder='Введите Email'
          onClick={handleOpenModalEmail}
          onChange={onChangeForm}
          disabled
          required
        />
        <FormTextfield
          register={register}
          label='Имя'
          name={ProfileFields.FIRST_NAME}
          rule={inputFullNameRule}
          error={Boolean(errors[ProfileFields.FIRST_NAME])}
          errorMessage={errors[ProfileFields.FIRST_NAME]?.message}
          placeholder='Введите имя'
          onChange={(event) =>
            handleChangeFormValue(event, ProfileFields.FIRST_NAME)
          }
          onBlur={(event) =>
            onBlurCorrectRegister(event, ProfileFields.FIRST_NAME)
          }
          required
        />
        <FormTextfield
          register={register}
          label='Фамилия'
          name={ProfileFields.LAST_NAME}
          rule={inputFullNameRule}
          error={Boolean(errors[ProfileFields.LAST_NAME])}
          errorMessage={errors[ProfileFields.LAST_NAME]?.message}
          placeholder='Введите фамилию'
          onChange={(event) =>
            handleChangeFormValue(event, ProfileFields.LAST_NAME)
          }
          onBlur={(event) =>
            onBlurCorrectRegister(event, ProfileFields.LAST_NAME)
          }
          required
        />
        <FormTextfield
          register={register}
          label='Отчество'
          name={ProfileFields.PATRONYMIC}
          rule={inputFullNameRule}
          error={Boolean(errors[ProfileFields.PATRONYMIC])}
          errorMessage={errors[ProfileFields.PATRONYMIC]?.message}
          placeholder='Введите отчество'
          onChange={(event) =>
            handleChangeFormValue(event, ProfileFields.PATRONYMIC)
          }
          onBlur={(event) =>
            onBlurCorrectRegister(event, ProfileFields.PATRONYMIC)
          }
          required
        />

        {/* !TODO: раскомментировать поле, когда добавят пол на бэк */}
        <TextField
          className={styles.inputField}
          select
          label='Пол'
          value=''
          placeholder='Введите пол'
          disabled
          // name='sex'
          // value={getValues('sex')}
          // onChange={(event) => handleChangeFormValue(event, 'sex')}
        >
          {selectSex.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
          <DesktopDatePicker
            inputFormat={DATE_INPUT_FORMAT}
            onChange={handleChangeDateOfBirth}
            value={dateOfBirth}
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
                    min: validateMinAge,
                    max: validateMaxAge,
                  },
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
      </Box>
    </>
  );
};

export { AccountFields };
