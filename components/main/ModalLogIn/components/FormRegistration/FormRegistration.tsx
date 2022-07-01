import { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, useController, Controller } from 'react-hook-form';
import { Box, Button, Typography, FormControl, TextField } from '@mui/material';
import { TailSpin } from 'react-loader-spinner';
import InputMask from 'react-input-mask';

import {
  fetchRegister,
  resetAllField,
  resetAllError,
  setActiveAuthorizationForm,
} from 'store/reducers/authentication/actions';
import {
  selectErrorRegistrationForm,
  selectLoadingRegistrationForm,
} from 'store/reducers/authentication/selectors';
import { FormInput } from 'components/main/FormInput';
import { getInputRules } from 'utility/helpers';
import { inputMasks } from 'constants/patterns';
import { EValidatePattern } from 'constants/types';
import { ActiveAutorizationFormKey } from 'constants/types';
import colors from 'styles/_export.module.scss';

import { setRegistrationFormErrors } from '../../helpers';
import { TFormData, FormKey } from './types';
import styles from '../../styles.module.scss';

const loaderColor = colors.white;

const FormRegistration: FC = () => {
  const [otherError, setOtherError] = useState('');
  const dispatch = useDispatch();

  const { handleSubmit, control, setError } = useForm<TFormData>();
  const passwordInput = useController({
    name: 'password',
    control,
    rules: getInputRules(),
  });
  const passwordRepeatInput = useController({
    name: 'passwordRepeat',
    control,
    rules: getInputRules(),
  });

  const errors = useSelector(selectErrorRegistrationForm);
  const loading = useSelector(selectLoadingRegistrationForm);

  const handleClickBackToMain = () => {
    dispatch(
      setActiveAuthorizationForm(ActiveAutorizationFormKey.AUTHORIZATION),
    );
    dispatch(resetAllField());
  };

  useEffect(() => {
    if (!errors) {
      setOtherError('');
      return;
    }

    setRegistrationFormErrors({
      errors,
      setError,
      setOtherError,
    });
  }, [errors, setError]);

  const onSubmit = handleSubmit((data) => {
    setOtherError('');
    const { phoneNumber, password, passwordRepeat } = data;
    dispatch(
      fetchRegister({ phoneNumber, password, password2: passwordRepeat }),
    );
    dispatch(resetAllError());
  });

  return (
    <FormControl onSubmit={onSubmit}>
      <Typography className={styles.formTitle}>Регистрация</Typography>
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
          value={passwordInput.field.value}
          label='Введите ваш пароль'
          isError={Boolean(passwordInput.fieldState.error)}
          hideValue
        />
      </Box>
      <Box className={styles.inputContainer}>
        <FormInput
          helperText={passwordRepeatInput.fieldState.error?.message}
          onChange={passwordRepeatInput.field.onChange}
          value={passwordRepeatInput.field.value}
          label='Повторите пароль'
          isError={Boolean(passwordRepeatInput.fieldState.error)}
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
          <Typography>Зарегистрироваться</Typography>
        )}
      </Button>
      {otherError && (
        <Typography className={styles.otherErrorMessage}>
          {otherError}
        </Typography>
      )}
      <Typography
        onClick={handleClickBackToMain}
        className={styles.otherFormButton}
      >
        Вернуться на главный экран
      </Typography>
    </FormControl>
  );
};

export { FormRegistration };
