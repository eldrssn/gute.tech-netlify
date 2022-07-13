import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Box, Button, Typography, FormControl, TextField } from '@mui/material';
import { TailSpin } from 'react-loader-spinner';
import InputMask from 'react-input-mask';

import {
  fetchResetPassword,
  setActiveAuthorizationForm,
} from 'store/reducers/authentication/actions';
import {
  selectLoadingResetPasswordForm,
  selectErrorResetPasswordForm,
} from 'store/reducers/authentication/selectors';
import { getInputRules } from 'utility/helpers';
import { inputMasks } from 'constants/patterns';
import { EValidatePattern, ActiveAutorizationFormKey } from 'constants/types';
import colors from 'styles/_export.module.scss';

import { setResetPasswordFormErrors } from '../../helpers';
import { TFormData, FormKey } from './types';
import styles from '../../styles.module.scss';

const loaderColor = colors.white;

const FormResetPassword: FC = () => {
  const dispatch = useDispatch();

  const { handleSubmit, control, setError } = useForm<TFormData>();

  const errors = useSelector(selectErrorResetPasswordForm);
  const loading = useSelector(selectLoadingResetPasswordForm);

  const onSubmit = handleSubmit((data) => {
    const { phoneNumber } = data;
    dispatch(fetchResetPassword({ phone_number: phoneNumber }));
  });

  useEffect(() => {
    if (!errors) {
      return;
    }

    setResetPasswordFormErrors({ setError, errors });
  }, [errors, setError]);

  return (
    <FormControl onSubmit={onSubmit}>
      <Typography className={styles.formTitle}>Сброс пароля</Typography>
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
      <Button
        onClick={onSubmit}
        variant={'contained'}
        className={styles.formButton}
      >
        {loading ? (
          <TailSpin height={25} width={25} color={loaderColor} />
        ) : (
          <Typography>Получить код</Typography>
        )}
      </Button>
      <Typography
        onClick={() => {
          dispatch(
            setActiveAuthorizationForm(ActiveAutorizationFormKey.AUTHORIZATION),
          );
        }}
        className={styles.otherFormButton}
      >
        Вернуться на главный экран
      </Typography>
    </FormControl>
  );
};

export { FormResetPassword };
