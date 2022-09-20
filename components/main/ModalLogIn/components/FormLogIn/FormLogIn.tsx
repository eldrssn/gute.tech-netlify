import { FC, KeyboardEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useController, Controller } from 'react-hook-form';
import { Box, Typography, TextField, FormControl } from '@mui/material';
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
import { Loader } from 'components/ui/Loader';
import { getInputRules } from 'utility/helpers';
import { handleEnterPress } from 'utility/utils';
import { inputMasks } from 'constants/patterns';
import { EValidatePattern, ActiveAutorizationFormKey } from 'constants/types';

import { setLogInFormErrors } from '../../helpers';
import { TFormData, Props, FormKey } from './types';
import styles from '../../styles.module.scss';

const FormLogIn: FC<Props> = ({ isOpen }) => {
  const [otherError, setOtherError] = useState<string[]>([]);
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
    setOtherError([]);
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
      setOtherError([]);
      return;
    }

    setLogInFormErrors({ setError, errors, setOtherError });
  }, [errors, setError]);

  const isOtherError = otherError.length > 0;

  const handleClickRegistration = () => {
    dispatch(
      setActiveAuthorizationForm(ActiveAutorizationFormKey.REGISTRATION),
    );
  };

  const handleClickResetPassword = () => {
    dispatch(
      setActiveAuthorizationForm(ActiveAutorizationFormKey.RESET_PASSWORD),
    );
  };

  return (
    <form onSubmit={onSubmit}>
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
          type='submit'
        />
      </Box>
      <button className={styles.formButton} type='submit'>
        {loading ? (
          <Loader size={25} />
        ) : (
          <Typography className={styles.formButton_text}>Войти</Typography>
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
          onClick={handleClickRegistration}
          tabIndex={0}
          className={styles.otherFormButton}
          onKeyPress={(event: KeyboardEvent) =>
            handleEnterPress(event, handleClickRegistration)
          }
        >
          Регистрация
        </Typography>
        <Typography
          onClick={handleClickResetPassword}
          className={styles.otherFormButton}
          tabIndex={0}
          onKeyPress={(event: KeyboardEvent) =>
            handleEnterPress(event, handleClickResetPassword)
          }
        >
          Напомнить пароль
        </Typography>
      </FormControl>
    </form>
  );
};

export { FormLogIn };
