import { FC, KeyboardEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, useController, Controller } from 'react-hook-form';
import { Box, Typography, FormControl, TextField } from '@mui/material';
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
import { Loader } from 'components/ui/Loader';
import { getInputRules } from 'utility/helpers';
import { handleEnterPress } from 'utility/utils';
import { inputMasks } from 'constants/patterns';
import { EValidatePattern } from 'constants/types';
import { ActiveAutorizationFormKey } from 'constants/types';

import { setRegistrationFormErrors } from '../../helpers';
import { TFormData, FormKey } from './types';
import styles from '../../styles.module.scss';

const FormRegistration: FC = () => {
  const [otherError, setOtherError] = useState<string[]>([]);
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
      setOtherError([]);
      return;
    }

    setRegistrationFormErrors({
      errors,
      setError,
      setOtherError,
    });
  }, [errors, setError]);

  const onSubmit = handleSubmit((data) => {
    setOtherError([]);
    const { phoneNumber, password, passwordRepeat } = data;
    dispatch(
      fetchRegister({ phoneNumber, password, password2: passwordRepeat }),
    );
    dispatch(resetAllError());
  });

  const isOtherError = otherError.length > 0;

  return (
    <form onSubmit={onSubmit}>
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
      <button className={styles.formButton} type='submit'>
        {loading ? (
          <Loader size={25} />
        ) : (
          <Typography className={styles.formButton_text}>
            Зарегистрироваться
          </Typography>
        )}
      </button>
      {isOtherError && (
        <>
          {otherError.map((error) => (
            <Typography key={error} className={styles.otherErrorMessage}>
              {error}
            </Typography>
          ))}
        </>
      )}
      <FormControl className={styles.formControl}>
        <Typography
          onClick={handleClickBackToMain}
          className={styles.otherFormButton}
          tabIndex={0}
          onKeyPress={(event: KeyboardEvent) =>
            handleEnterPress(event, handleClickBackToMain)
          }
        >
          Авторизация
        </Typography>
      </FormControl>
    </form>
  );
};

export { FormRegistration };
