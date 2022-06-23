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

import { CustomButton } from 'components/ui/CustomButton';
import { ModalSaveChanges } from 'components/main/ModalSaveChanges';
import { ModalEditUserEmail } from 'components/main/ModalEditUserEmail';

import { inputRule, mockValues, selectSex } from './constants';
import { TFormData } from './types';
import styles from './userForm.module.scss';

const UserForm = () => {
  const [isFormChanging, setFormChanging] = useState(false);
  const [isModalEmail, setIsModalEmail] = useState(false);
  const [isModalSave, setIsModalSave] = useState(false);
  const [sex, setSex] = React.useState<string | null>(null);
  const [dateOfBirth, setDateOfBirth] = React.useState<Date | null>(new Date());

  const {
    handleSubmit,
    setValue,
    register,
    reset,
    trigger,
    formState: { errors, isValid },
  } = useForm<TFormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    defaultValues: mockValues,
  });

  const onSumbit = handleSubmit((data) => {
    // FIXME: подключить к апи и убрать консоль
    console.log(data);
    setFormChanging(false);
    setIsModalSave(false);
  });

  const onReset = () => {
    reset();
    setFormChanging(false);
    setIsModalSave(false);
  };

  const openModalSave = () => {
    trigger();

    if (isValid) {
      setIsModalSave(true);
    }
  };

  const onChangeForm = () => setFormChanging(true);

  const handleChangeDateOfBirth = (newValue: Date | null) => {
    onChangeForm();
    setDateOfBirth(newValue);
  };

  return (
    <form onSubmit={onSumbit} className={styles.formContainer}>
      <ModalSaveChanges
        isOpen={isModalSave}
        setIsOpen={setIsModalSave}
        onReset={onReset}
      />

      <ModalEditUserEmail
        isOpen={isModalEmail}
        setIsOpen={setIsModalEmail}
        setValue={setValue}
      />

      <Box
        className={styles.formColumn}
        sx={{ width: { xs: '100%', md: '50%' } }}
      >
        <FormLabel className={styles.formLabel}>Учетные данные</FormLabel>
        <TextField
          className={styles.inputField}
          label='Телефон'
          placeholder='Введите телефон'
          {...register('phone_number')}
          disabled
        />
        <TextField
          className={styles.inputField}
          label='Email'
          {...register('email')}
          placeholder='Введите Email'
          onClick={() => setIsModalEmail(true)}
          onChange={onChangeForm}
          disabled={isModalEmail}
        />

        <TextField
          className={styles.inputField}
          label='Имя'
          {...register('first_name', inputRule)}
          placeholder='Введите имя'
          error={Boolean(errors.first_name)}
          onChange={onChangeForm}
        />
        {errors.first_name && (
          <FormHelperText error className={styles.inputField_error}>
            {errors.first_name.message}
          </FormHelperText>
        )}
        <TextField
          className={styles.inputField}
          label='Фамилия'
          {...register('last_name', inputRule)}
          placeholder='Введите фамилию'
          error={Boolean(errors.last_name)}
          onChange={onChangeForm}
        />
        {errors.last_name && (
          <FormHelperText error className={styles.inputField_error}>
            {errors.last_name.message}
          </FormHelperText>
        )}

        <TextField
          className={styles.inputField}
          label='Отчество'
          {...register('patronymic', inputRule)}
          placeholder='Введите отчество'
          error={Boolean(errors.patronymic)}
          onChange={onChangeForm}
        />
        {errors.patronymic && (
          <FormHelperText error className={styles.inputField_error}>
            {errors.patronymic.message}
          </FormHelperText>
        )}

        <TextField
          className={styles.inputField}
          select
          label='Пол'
          value={sex}
          placeholder='Введите пол'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onChangeForm();
            setSex(event.target.value);
          }}
        >
          {selectSex.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            inputFormat='dd/MM/yyyy'
            value={dateOfBirth}
            onChange={handleChangeDateOfBirth}
            label='Дата рождения'
            renderInput={(params) => (
              <TextField
                className={styles.inputField}
                placeholder='Выберете дату рождения'
                {...params}
                {...register('date_of_birthday', {
                  valueAsDate: true,
                })}
              />
            )}
          />
        </LocalizationProvider>
      </Box>
      <Box
        className={styles.formColumn}
        sx={{ width: { xs: '100%', md: '50%' } }}
      >
        <FormLabel className={styles.formLabel}>Публичные данные</FormLabel>
        <TextField
          className={styles.inputField}
          label='Никнейм'
          placeholder='Выберете никнейм'
          {...register('username', inputRule)}
          error={Boolean(errors.username)}
          onChange={onChangeForm}
        />
        {errors.username && (
          <FormHelperText error className={styles.inputField_error}>
            {errors.username.message}
          </FormHelperText>
        )}

        <TextField
          className={styles.inputField}
          label='Страна'
          placeholder='Введите страну'
          value='Россия'
          onChange={onChangeForm}
          disabled
        />
        <TextField
          className={styles.inputField}
          label='Город'
          placeholder='Введите город'
          value='Ульяновск'
          onChange={onChangeForm}
          disabled
        />
      </Box>
      {isFormChanging && (
        <Box className={styles.buttonsContainer}>
          <CustomButton onClick={openModalSave}>Сохранить</CustomButton>
          <CustomButton onClick={openModalSave}>Отмена</CustomButton>
        </Box>
      )}
    </form>
  );
};

export { UserForm };
