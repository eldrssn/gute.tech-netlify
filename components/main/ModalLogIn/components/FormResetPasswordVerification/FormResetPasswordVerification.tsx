import { FC, KeyboardEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputMask from 'react-input-mask';

import {
  fetchResetPasswordVerification,
  setActiveAuthorizationForm,
} from 'store/reducers/authentication/actions';
import {
  selectLoadingResetPasswordVerificationForm,
  selectErrorResetPasswordVerificationForm,
  selectResetPasswordPhone,
} from 'store/reducers/authentication/selectors';
import { inputMasks } from 'constants/patterns';
import { handleEnterPress } from 'utility/utils';
import { ActiveAutorizationFormKey } from 'constants/types';
import { Loader } from 'components/ui/Loader';
import colors from 'styles/_export.module.scss';

import { setResetPasswordVerificationFormErrors } from '../../helpers';
import { TFormData, FormKey } from './types';
import styles from '../../styles.module.scss';

const loaderColor = colors.white;

const FormResetPasswordVerification: FC = () => {
  const dispatch = useDispatch();

  const { handleSubmit, control, setError } = useForm<TFormData>();

  const errors = useSelector(selectErrorResetPasswordVerificationForm);
  const loading = useSelector(selectLoadingResetPasswordVerificationForm);
  const phoneNumber = useSelector(selectResetPasswordPhone);

  const onSubmit = handleSubmit((data) => {
    if (!phoneNumber) {
      return;
    }

    const { code } = data;
    dispatch(
      fetchResetPasswordVerification({ phone_number: phoneNumber, code }),
    );
  });

  useEffect(() => {
    if (!errors) {
      return;
    }

    setResetPasswordVerificationFormErrors({ setError, errors });
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
        <Controller
          name={FormKey.CODE}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputMask
              mask={inputMasks.codeMask}
              value={value ? value : ''}
              onChange={onChange}
            >
              <TextField
                error={Boolean(error)}
                helperText={error?.message}
                label='последние 4 цифры номера с которого поступил звонок-сброс'
                variant='outlined'
                type='text'
                fullWidth
              />
            </InputMask>
          )}
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

export { FormResetPasswordVerification };
