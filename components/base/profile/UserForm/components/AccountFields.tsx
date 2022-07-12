import React, { FC } from 'react';
import { Box, FormLabel, MenuItem, TextField } from '@mui/material';

import { FormTextfield } from 'components/ui/FormTextfield';

import Datepicker from './Datepicker';
import { inputFullNameRule, selectSex, ProfileFields } from '../constants';
import { correctRegister } from '../helpers';
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
  const onBlurCorrectRegister = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
    title: TFormDataFields,
  ) => {
    const correctedRegister = correctRegister(event);
    setValue(title, correctedRegister);
    trigger(title);
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

        <Datepicker
          getValues={getValues}
          errors={errors}
          register={register}
          setValue={setValue}
          onChangeForm={onChangeForm}
        />
      </Box>
    </>
  );
};

export { AccountFields };
