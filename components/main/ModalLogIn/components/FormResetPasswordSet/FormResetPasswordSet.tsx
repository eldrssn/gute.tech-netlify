import { FC, KeyboardEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useController } from 'react-hook-form';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';

import {
  fetchResetPasswordSet,
  setActiveAuthorizationForm,
} from 'store/reducers/authentication/actions';
import {
  selectResetPasswordVerificationPhone,
  selectResetPasswordVerificationCode,
  selectResetPasswordSetError,
  selectLoadingResetPasswordSet,
} from 'store/reducers/authentication/selectors';
import { getInputRules } from 'utility/helpers';
import { FormInput } from 'components/main/FormInput';
import { Loader } from 'components/ui/Loader';
import { ActiveAutorizationFormKey } from 'constants/types';
import { handleEnterPress } from 'utility/utils';
import colors from 'styles/_export.module.scss';

import { setResetPasswordSetFormErrors } from '../../helpers';
import { TFormData, FormKey } from './types';
import styles from '../../styles.module.scss';

const loaderColor = colors.white;

const FormResetPasswordSet: FC = () => {
  const dispatch = useDispatch();

  const { handleSubmit, setError, control } = useForm<TFormData>();
  const passwordInput = useController({
    name: FormKey.PASSWORD,
    control,
    rules: getInputRules(),
  });
  const passwordRepeatInput = useController({
    name: FormKey.PASSWORD_REPEAT,
    control,
    rules: getInputRules(),
  });

  const errors = useSelector(selectResetPasswordSetError);
  const loading = useSelector(selectLoadingResetPasswordSet);
  const phoneNumber = useSelector(selectResetPasswordVerificationPhone);
  const code = useSelector(selectResetPasswordVerificationCode);

  const onSubmit = handleSubmit((data) => {
    if (!phoneNumber || !code) {
      return;
    }

    const { password, passwordRepeat } = data;
    dispatch(
      fetchResetPasswordSet({
        phone_number: phoneNumber,
        code,
        password,
        password2: passwordRepeat,
      }),
    );
  });

  useEffect(() => {
    if (!errors) {
      return;
    }

    setResetPasswordSetFormErrors({ setError, errors });
  }, [errors, setError]);

  const handleClickBackToMain = () => {
    dispatch(
      setActiveAuthorizationForm(ActiveAutorizationFormKey.AUTHORIZATION),
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <Typography className={styles.formTitle}>Сброс пароля</Typography>
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
          <Loader size={25} color={loaderColor} />
        ) : (
          <Typography className={styles.formButton_text}>
            Сбросить пароль
          </Typography>
        )}
      </button>
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

export { FormResetPasswordSet };
