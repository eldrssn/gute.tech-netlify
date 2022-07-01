import { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, useController } from 'react-hook-form';
import { Box, Button, Typography, FormControl } from '@mui/material';
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
  selectIsRegistrationVerificationRetry,
  selectRegistrationVerificationRetryError,
  selectLoadingRegistrationVerificationRetry,
  selectAuthorizationError,
} from 'store/reducers/authentication/selectors';
import { FormInput } from 'components/main/FormInput';
import { getInputRules } from 'utility/helpers';
import { ActiveAutorizationFormKey } from 'constants/types';
import colors from 'styles/_export.module.scss';

import { selectTitleRetryButton } from '../../helpers';
import { TFormData, FormKey, Props } from './types';
import styles from '../../styles.module.scss';

const loaderSubmitButton = colors.white;
const loaderRetryButton = colors.blue;

const FormRegistrationVerification: FC<Props> = ({ closeModal }) => {
  const [otherError, setOtherError] = useState('');
  const [titleRetryButton, setTitleRetryButton] = useState('');
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
  const isRegistrationVerificationRetry = useSelector(
    selectIsRegistrationVerificationRetry,
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
    if (isRegistrationVerificationRetry || registrationVerificationErrorRetry) {
      return;
    }

    dispatch(fetchRegisterVerificationRetry({ phoneNumber }));
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
    if (registrationVerificationErrorForm?.non_field_errors) {
      setOtherError(registrationVerificationErrorForm.non_field_errors);
    }
  }, [registrationVerificationErrorForm]);

  useEffect(() => {
    selectTitleRetryButton({
      isRegistrationVerificationRetry,
      registrationVerificationErrorRetry,
      setTitleRetryButton,
    });
  }, [
    isRegistrationVerificationRetry,
    registrationVerificationErrorRetry,
    setTitleRetryButton,
  ]);

  const onSubmit = handleSubmit((data) => {
    const { code } = data;
    dispatch(fetchRegisterVerification({ phoneNumber, code }));
  });

  return (
    <FormControl onSubmit={onSubmit}>
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
      <Button
        onClick={onSubmit}
        variant={'contained'}
        className={styles.formButton}
      >
        {loadingRegistrationVerification ? (
          <TailSpin height={25} width={25} color={loaderSubmitButton} />
        ) : (
          <Typography>Подтвердить</Typography>
        )}
      </Button>
      {otherError && (
        <Typography className={styles.otherErrorMessage}>
          {otherError}
        </Typography>
      )}
      <Typography
        onClick={handleClickRetryCode}
        className={cn(styles.otherFormButton, {
          [styles.retryButtonSuccess]: isRegistrationVerificationRetry,
          [styles.retryButtonLoading]: loadingRegistrationVerificationRetry,
          [styles.retryButtonError]: registrationVerificationErrorRetry,
        })}
      >
        {loadingRegistrationVerificationRetry ? (
          <TailSpin height={21} width={21} color={loaderRetryButton} />
        ) : (
          titleRetryButton
        )}
      </Typography>
      <Typography
        onClick={handleClickBackToMain}
        className={styles.otherFormButton}
      >
        Вернуться на главный экран
      </Typography>
    </FormControl>
  );
};

export { FormRegistrationVerification };
