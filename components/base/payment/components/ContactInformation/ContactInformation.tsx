import React from 'react';
import { useController, Controller } from 'react-hook-form';
import { Box, Typography, TextField } from '@mui/material';
import InputMask from 'react-input-mask';

import { FormInput } from 'components/main/FormInput';
import { getInputRules } from 'utility/helpers';
import { EValidatePattern } from 'constants/types';
import { inputMasks } from 'constants/patterns';

import { TContactInformationProps } from '../../types';
import styles from './ContactInformation.module.scss';

const ContactInformation: React.FC<TContactInformationProps> = ({
  control,
}) => {
  const nameInput = useController({
    name: 'nameValue',
    control,
    rules: getInputRules(),
  });
  const emailInput = useController({
    name: 'emailValue',
    control,
    rules: getInputRules(EValidatePattern.EMAIL),
  });

  return (
    <Box component='div' className={styles.contactInfoBox}>
      <Typography variant='h6' className={styles.formHeading}>
        Контактная информация
      </Typography>
      <Box className={styles.inputContainer}>
        <InputMask
          mask={inputMasks.nameMask}
          value={nameInput.field.value}
          onChange={nameInput.field.onChange}
          maskPlaceholder=''
        >
          <FormInput
            helperText={nameInput.fieldState.error?.message}
            onChange={nameInput.field.onChange}
            value={nameInput.field.value}
            label='Ваше имя'
            isError={Boolean(nameInput.fieldState.error)}
          />
        </InputMask>
      </Box>
      <Box className={styles.inputContainer}>
        <Controller
          name='phoneNumber'
          control={control}
          rules={getInputRules(EValidatePattern.PHONE_NUMBER)}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputMask
              mask={inputMasks.phoneMask}
              value={value}
              onChange={onChange}
            >
              <TextField
                error={Boolean(error)}
                helperText={error?.message}
                label='Телефон'
                variant='outlined'
                type='text'
                fullWidth
              />
            </InputMask>
          )}
        />
      </Box>
      <Box className={styles.inputContainer}>
        <FormInput
          helperText={emailInput.fieldState.error?.message}
          onChange={emailInput.field.onChange}
          value={emailInput.field.value}
          label='Email'
          isError={Boolean(emailInput.fieldState.error)}
          maxLength={50}
        />
      </Box>
    </Box>
  );
};

export { ContactInformation };
