import React, { FC, KeyboardEvent, useState } from 'react';
import { Box, FormLabel, MenuItem, TextField } from '@mui/material';

import { ModalEditUserEmail } from 'components/main/ModalEditUserEmail';
import { FormTextfield } from 'components/ui/FormTextfield';

import { Datepicker } from './Datepicker';
import { inputFullNameRule, selectSex, ProfileFields } from '../constants';
import { AccountFieldsProps } from '../types';

import styles from '../userForm.module.scss';
import { handleEnterPress } from 'utility/utils';

const AccountFields: FC<AccountFieldsProps> = ({
  register,
  onChangeForm,
  setValue,
  errors,
  control,
  getValues,
  handleChangeFormValue,
}) => {
  const [isOpenModalEmail, setIsOpenModalEmail] = useState(false);

  const handleOpenModalEmail = () => setIsOpenModalEmail(true);

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
          onKeyPress={(event: KeyboardEvent) =>
            handleEnterPress(event, handleOpenModalEmail)
          }
          inputProps={{ readOnly: true }}
          required
        />

        {isOpenModalEmail && (
          <ModalEditUserEmail
            isOpen={isOpenModalEmail}
            setIsOpen={setIsOpenModalEmail}
            setValue={setValue}
            getValues={getValues}
          />
        )}

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
          control={control}
          register={register}
          setValue={setValue}
          onChangeForm={onChangeForm}
        />
      </Box>
    </>
  );
};

export { AccountFields };
