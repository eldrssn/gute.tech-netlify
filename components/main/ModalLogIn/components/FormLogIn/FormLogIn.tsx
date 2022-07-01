import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useController, Controller } from 'react-hook-form';
import { Box, Button, Typography, FormControl, TextField } from '@mui/material';
import { TailSpin } from 'react-loader-spinner';
import InputMask from 'react-input-mask';

import {
  setActiveAuthorizationForm,
  fetchTokens,
} from 'store/reducers/authentication/actions';
import {
  selectAuthorizationError,
  selectLoadingAuthorized,
} from 'store/reducers/authentication/selectors';
import { FormInput } from 'components/main/FormInput';
import { getInputRules } from 'utility/helpers';
import { inputMasks } from 'constants/patterns';
import { EValidatePattern, ActiveAutorizationFormKey } from 'constants/types';
import colors from 'styles/_export.module.scss';

import { setLogInFormErrors } from '../../helpers';
import { TFormData, Props, FormKey } from './types';
import styles from '../../styles.module.scss';

const loaderColor = colors.white;

const FormLogIn: FC<Props> = ({ isOpen }) => {
  const [otherError, setOtherError] = useState('');
  const dispatch = useDispatch();

  const { handleSubmit, control, setError, resetField } = useForm<TFormData>();
  const passwordInput = useController({
    name: FormKey.PASSWORD,
    control,
    rules: getInputRules(),
  });

  const errors = useSelector(selectAuthorizationError);
  const loading = useSelector(selectLoadingAuthorized);

  const onSubmit = handleSubmit((data) => {
    setOtherError('');
    const { phoneNumber, password } = data;
    dispatch(fetchTokens({ phoneNumber, password }));
  });

  useEffect(() => {
    if (isOpen) {
      return;
    }

    resetField(FormKey.PASSWORD);
    resetField(FormKey.PHONE_NUMBER);
  }, [isOpen, resetField]);

  useEffect(() => {
    if (!errors) {
      setOtherError('');
      return;
    }

    setLogInFormErrors({ setError, errors, setOtherError });
  }, [errors, setError]);

  return (
    <FormControl onSubmit={onSubmit}>
      <Typography className={styles.formTitle}>авторизация</Typography>
      <Box className={styles.inputContainer}>
        <Controller
          name={FormKey.PHONE_NUMBER}
          control={control}
          rules={getInputRules(EValidatePattern.PHONE_NUMBER)}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputMask
              mask={inputMasks.phoneMask}
              value={value ? value : ''}
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
          helperText={passwordInput.fieldState.error?.message}
          onChange={passwordInput.field.onChange}
          value={passwordInput.field.value ? passwordInput.field.value : ''}
          label='Введите ваш пароль'
          isError={Boolean(passwordInput.fieldState.error)}
          hideValue
        />
      </Box>
      <Button
        onClick={onSubmit}
        variant={'contained'}
        className={styles.formButton}
      >
        {loading ? (
          <TailSpin height={25} width={25} color={loaderColor} />
        ) : (
          <Typography>Войти</Typography>
        )}
      </Button>
      {otherError && (
        <Typography className={styles.otherErrorMessage}>
          {otherError}
        </Typography>
      )}
      <Typography
        onClick={() => {
          dispatch(
            setActiveAuthorizationForm(ActiveAutorizationFormKey.REGISTRATION),
          );
        }}
        className={styles.otherFormButton}
      >
        Регистрация
      </Typography>
      <Typography className={styles.otherFormButton}>
        Напомнить пароль
      </Typography>
    </FormControl>
  );
};

export { FormLogIn };
