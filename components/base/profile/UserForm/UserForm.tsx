import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  FormHelperText,
  FormLabel,
  MenuItem,
  TextField,
} from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';

import { CustomButton } from 'components/ui/CustomButton';
import { ModalSaveChanges } from 'components/main/ModalSaveChanges';
import { ModalEditUserEmail } from 'components/main/ModalEditUserEmail';

import {
  correctRegister,
  formatDate,
  validateMaxAge,
  validateMinAge,
} from './helpers';
import {
  inputFullNameRule,
  MAX_DATE,
  MIN_DATE,
  mockValues,
  selectSex,
  selectCity,
  usernameRule,
} from './constants';
import { TDate, TFormData, TFormDataFields } from './types';

import styles from './userForm.module.scss';
import { FormTextfield } from 'components/ui/FormTextfield';

const UserForm = () => {
  const [isFormChanging, setFormChanging] = useState(false);
  const [isOpenModalEmail, setIsOpenModalEmail] = useState(false);
  const [isOpenModalSave, setIsOpenModalSave] = useState(false);

  const {
    handleSubmit,
    setValue,
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<TFormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    defaultValues: mockValues,
    shouldFocusError: true,
  });

  const defaultDateOfBirthday = getValues('date_of_birthday');
  const [dateOfBirth, setDateOfBirth] = React.useState<TDate>(
    defaultDateOfBirthday,
  );

  const onSumbit = handleSubmit((data) => {
    // FIXME: подключить к апи и убрать консоль
    console.log(data);
    setFormChanging(false);
    setIsOpenModalSave(false);
  });

  const openModalSave = async () => {
    const isValid = await trigger();

    if (isValid) {
      setIsOpenModalSave(true);
    }
  };

  const onChangeForm = async () => {
    await trigger();
    setFormChanging(true);
  };

  const handleChangeDateOfBirth = (
    value: Date | null,
    keyboardInputValue?: string,
  ) => {
    onChangeForm();

    if (!keyboardInputValue) {
      setValue('date_of_birthday', value);
      setDateOfBirth(value);
      return;
    }

    const formatedDate = formatDate(keyboardInputValue);
    setValue('date_of_birthday', formatedDate);
    setDateOfBirth(formatedDate);
  };

  const onBlurCorrectRegister = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
    title: TFormDataFields,
  ) => {
    const correctedRegister = correctRegister(event);
    setValue(title, correctedRegister);
    trigger(title);
  };

  const handleChangeFormValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: TFormDataFields,
  ) => {
    onChangeForm();
    setValue(field, event.target.value);
  };

  return (
    <>
      <ModalEditUserEmail
        isOpen={isOpenModalEmail}
        setIsOpen={setIsOpenModalEmail}
        setValue={setValue}
      />

      <form onSubmit={onSumbit} className={styles.formContainer}>
        <ModalSaveChanges
          isOpen={isOpenModalSave}
          setIsOpen={setIsOpenModalSave}
        />

        <Box
          className={styles.formColumn}
          sx={{ width: { xs: '100%', md: '50%' } }}
        >
          <FormLabel className={styles.formLabel}>Учетные данные</FormLabel>

          <FormTextfield
            register={register}
            label='Телефон'
            name='phone_number'
            placeholder='Введите телефон'
            disabled
            required
          />

          <FormTextfield
            register={register}
            label='Email'
            name='email'
            placeholder='Введите Email'
            onClick={() => setIsOpenModalEmail(true)}
            onChange={onChangeForm}
            disabled
            required
          />

          <FormTextfield
            register={register}
            label='Имя'
            name='first_name'
            rule={inputFullNameRule}
            error={Boolean(errors.first_name)}
            errorMessage={errors.first_name?.message}
            placeholder='Введите имя'
            onChange={onChangeForm}
            onBlur={(event) => onBlurCorrectRegister(event, 'first_name')}
            required
          />

          <FormTextfield
            register={register}
            label='Фамилия'
            name='last_name'
            rule={inputFullNameRule}
            error={Boolean(errors.last_name)}
            errorMessage={errors.last_name?.message}
            placeholder='Введите фамилию'
            onChange={onChangeForm}
            onBlur={(event) => onBlurCorrectRegister(event, 'last_name')}
            required
          />

          <FormTextfield
            register={register}
            label='Отчество'
            name='patronymic'
            rule={inputFullNameRule}
            error={Boolean(errors.patronymic)}
            errorMessage={errors.patronymic?.message}
            placeholder='Введите отчество'
            onChange={onChangeForm}
            onBlur={(event) => onBlurCorrectRegister(event, 'patronymic')}
            required
          />

          <TextField
            className={styles.inputField}
            select
            label='Пол'
            value={getValues('sex')}
            placeholder='Введите пол'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              onChangeForm();
              setValue('sex', event.target.value);
            }}
          >
            {selectSex.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
            <DesktopDatePicker
              inputFormat='dd/MM/yyyy'
              onChange={handleChangeDateOfBirth}
              value={dateOfBirth}
              label='Дата рождения'
              disableFuture
              mask='__/__/____'
              maxDate={MAX_DATE}
              minDate={MIN_DATE}
              disableHighlightToday
              renderInput={(params) => (
                <TextField
                  className={styles.inputField}
                  placeholder='Выберете дату рождения'
                  {...params}
                  error={Boolean(errors.date_of_birthday)}
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

          {errors.date_of_birthday && (
            <FormHelperText error className={styles.inputField_error}>
              {errors.date_of_birthday?.message}
            </FormHelperText>
          )}
        </Box>

        <Box
          className={styles.formColumn}
          sx={{ width: { xs: '100%', md: '50%' } }}
        >
          <FormLabel className={styles.formLabel}>Публичные данные</FormLabel>

          <FormTextfield
            register={register}
            label='Никнейм'
            name='username'
            rule={usernameRule}
            error={Boolean(errors.username)}
            errorMessage={errors.username?.message}
            placeholder='Введите никнейм'
            onChange={onChangeForm}
            required
          />

          <FormTextfield
            register={register}
            label='Страна'
            name='country'
            placeholder='Введите страну'
            onChange={onChangeForm}
            disabled
          />

          <TextField
            className={styles.inputField}
            select
            label='Город'
            value={getValues('city')}
            placeholder='Введите город'
            onChange={(event) => handleChangeFormValue(event, 'city')}
          >
            {selectCity.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {isFormChanging && (
          <Box className={styles.buttonsContainer}>
            <CustomButton onClick={openModalSave}>Сохранить</CustomButton>
            <CustomButton onClick={openModalSave}>Отмена</CustomButton>
          </Box>
        )}
      </form>
    </>
  );
};

export { UserForm };
