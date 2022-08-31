import { FC, KeyboardEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, useController } from 'react-hook-form';
import { useTimer } from 'react-timer-hook';
import { Box, Typography, FormControl } from '@mui/material';
import { TailSpin } from 'react-loader-spinner';
import cn from 'classnames';

import {
  fetchTokens,
  fetchRegisterVerification,
  resetAllField,
  setActiveAuthorizationForm,
  fetchRegisterVerificationRetry,
} from 'store/reducers/authentication/actions';
import {
  selectRegistrationVerificationFormError,
  selectLoadingRegistrationVerificationForm,
  selectRegistrationPhoneNumber,
  selectRegistrationPassword,
  selectIsRegistrationVerificationForm,
  selectRegistrationVerificationRetryError,
  selectLoadingRegistrationVerificationRetry,
  selectAuthorizationError,
} from 'store/reducers/authentication/selectors';
import { FormInput } from 'components/main/FormInput';
import { getInputRules } from 'utility/helpers';
import { handleEnterPress } from 'utility/utils';
import { ActiveAutorizationFormKey } from 'constants/types';
import colors from 'styles/_export.module.scss';

import { setErrorRetryButton, getTimerTime } from '../../helpers';
import { TFormData, FormKey, Props } from './types';
import styles from '../../styles.module.scss';

const loaderSubmitButton = colors.white;
const loaderRetryButton = colors.blue;

const FormRegistrationVerification: FC<Props> = ({ closeModal }) => {
  const [otherError, setOtherError] = useState<string[]>([]);
  const [titleRetryButton, setTitleRetryButton] = useState('');

  const { seconds, minutes, isRunning, restart } = useTimer({
    expiryTimestamp: getTimerTime(),
    autoStart: false,
  });

  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm<TFormData>();
  const codeInput = useController({
    name: FormKey.CODE,
    control,
    rules: getInputRules(),
  });

  const phoneNumber = useSelector(selectRegistrationPhoneNumber);
  const password = useSelector(selectRegistrationPassword);
  const authorizationError = useSelector(selectAuthorizationError);
  const registrationVerificationErrorForm = useSelector(
    selectRegistrationVerificationFormError,
  );
  const loadingRegistrationVerification = useSelector(
    selectLoadingRegistrationVerificationForm,
  );
  const isRegistrationVerificationForm = useSelector(
    selectIsRegistrationVerificationForm,
  );
  const loadingRegistrationVerificationRetry = useSelector(
    selectLoadingRegistrationVerificationRetry,
  );
  const registrationVerificationErrorRetry = useSelector(
    selectRegistrationVerificationRetryError,
  );

  const handleClickBackToMain = () => {
    dispatch(
      setActiveAuthorizationForm(ActiveAutorizationFormKey.AUTHORIZATION),
    );
    dispatch(resetAllField());
  };

  const handleClickRetryCode = () => {
    if (isRunning) {
      return;
    }

    dispatch(fetchRegisterVerificationRetry({ phoneNumber }));
    restart(getTimerTime());
  };

  useEffect(() => {
    if (isRegistrationVerificationForm) {
      dispatch(fetchTokens({ phoneNumber, password }));
    }
  }, [isRegistrationVerificationForm, dispatch, password, phoneNumber]);

  useEffect(() => {
    if (isRegistrationVerificationForm && authorizationError) {
      closeModal();
    }
  }, [isRegistrationVerificationForm, authorizationError, closeModal]);

  useEffect(() => {
    if (registrationVerificationErrorForm?.errors.non_field_errors) {
      setOtherError(registrationVerificationErrorForm.errors.non_field_errors);
    }
  }, [registrationVerificationErrorForm]);

  useEffect(() => {
    setErrorRetryButton({
      registrationVerificationErrorRetry,
      setTitleRetryButton,
    });
  }, [registrationVerificationErrorRetry, setTitleRetryButton]);

  const onSubmit = handleSubmit((data) => {
    const { code } = data;
    dispatch(fetchRegisterVerification({ phoneNumber, code }));
  });

  const getRetryButtonTitle = () =>
    isRunning ? `${minutes}:${seconds}` : titleRetryButton;

  const isOtherError = otherError.length > 0;

  return (
    <form onSubmit={onSubmit}>
      <Typography className={styles.formTitle}>Подтверждение</Typography>
      <Box className={styles.inputContainer}>
        <FormInput
          helperText={codeInput.fieldState.error?.message}
          onChange={codeInput.field.onChange}
          value={codeInput.field.value}
          label='Введите код подтверждения'
          isError={Boolean(codeInput.fieldState.error)}
        />
      </Box>
      <button className={styles.formButton} type='submit'>
        {loadingRegistrationVerification ? (
          <TailSpin height={25} width={25} color={loaderSubmitButton} />
        ) : (
          <Typography className={styles.formButton_text}>
            Подтвердить
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
          onClick={handleClickRetryCode}
          className={cn(styles.otherFormButton, {
            [styles.retryButtonTimer]: isRunning,
            [styles.retryButtonLoading]: loadingRegistrationVerificationRetry,
            [styles.retryButtonError]: registrationVerificationErrorRetry,
          })}
        >
          {loadingRegistrationVerificationRetry ? (
            <TailSpin height={21} width={21} color={loaderRetryButton} />
          ) : (
            getRetryButtonTitle()
          )}
        </Typography>
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

export { FormRegistrationVerification };
