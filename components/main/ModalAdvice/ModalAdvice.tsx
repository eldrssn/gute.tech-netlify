import React, { KeyboardEvent } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { useForm, useController, Controller } from 'react-hook-form';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import InputMask from 'react-input-mask';

import { ModalWrapper } from 'components/main/ModalWrapper';
import { FormInput } from 'components/main/FormInput';
import { selectMetrics } from 'store/reducers/showcase/selectors';
import { getInputRules } from 'utility/helpers';
import { handleEnterPress } from 'utility/utils';
import { EValidatePattern } from 'constants/types';
import { postFeedback } from 'api/routes/feedback';
import { inputMasks } from 'constants/patterns';
import { sendMetrik } from 'utility/utils/metriks';

import { TFormData, TOuterProps } from './types';
import styles from './styles.module.scss';

const ModalAdvice: React.FC<TOuterProps> = ({ isOpen, setIsOpen }) => {
  const { handleSubmit, control, setError, formState, resetField } =
    useForm<TFormData>();
  const nameInput = useController({
    name: 'nameValue',
    control,
    rules: getInputRules(),
  });
  const message = useController({
    name: 'message',
    control,
    rules: getInputRules(),
  });

  const metrics = useSelector(selectMetrics);

  const closeModal = () => {
    setIsOpen(false);
    resetField('message');
    resetField('nameValue');
    resetField('phoneNumber');
  };

  const onSubmit = handleSubmit((data) => {
    const { nameValue, phoneNumber, message } = data;
    sendMetrik(
      'reachGoal',
      metrics?.button_callback_submit,
      metrics?.metric_id,
    );
    if (nameValue && phoneNumber && message) {
      nameValue;
      postFeedback({
        name: nameValue,
        phone: phoneNumber,
        message: message,
      })
        .then(() => {
          closeModal();
          resetField('message');
          resetField('nameValue');
          resetField('phoneNumber');
        })
        .catch(() =>
          setError('phoneNumber', {
            type: 'pattern',
            message: 'Введен некорректный номер телефона',
          }),
        );
    }
  });

  const phoneInputIsError = Boolean(formState.errors.phoneNumber);

  const handlePressEnterCloseModal = (event: KeyboardEvent) => {
    handleEnterPress(event, closeModal);
  };
  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={closeModal}
      modalTitle='advice'
      initialFocus='#enter-name'
    >
      <Container fixed sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          className={styles.closeModal}
          onClick={closeModal}
          tabIndex={0}
          onKeyPress={handlePressEnterCloseModal}
        >
          <FontAwesomeIcon icon={faTimes} />
        </Box>
        <form onSubmit={onSubmit} className={styles.container}>
          <Typography
            className={styles.title}
            id='modal-modal-title'
            variant='h6'
            component='h2'
            mb={1}
          >
            ОСТАВЬТЕ ВАШ НОМЕР ТЕЛЕФОНА
          </Typography>
          <Typography
            className={styles.description}
            id='modal-modal-description'
          >
            Мы перезвоним в течение 17 минут и предложим лучший вариант!
          </Typography>
          <>
            <Box component='div' className={styles.inputBox}>
              <Box
                className={cn(styles.inputContainer, {
                  [styles.inputIsError]: Boolean(nameInput.fieldState.error),
                })}
              >
                <InputMask
                  mask={inputMasks.nameMask}
                  value={nameInput.field.value ? nameInput.field.value : ''}
                  onChange={nameInput.field.onChange}
                  maskPlaceholder=''
                >
                  <FormInput
                    helperText={nameInput.fieldState.error?.message}
                    onChange={nameInput.field.onChange}
                    value={nameInput.field.value ? nameInput.field.value : ''}
                    label='Ваше имя'
                    isError={Boolean(nameInput.fieldState.error)}
                    id='enter-name'
                  />
                </InputMask>
              </Box>
              <Box
                className={cn(styles.inputContainer, {
                  [styles.inputIsError]: phoneInputIsError,
                })}
              >
                <Controller
                  name='phoneNumber'
                  control={control}
                  rules={getInputRules(EValidatePattern.PHONE_NUMBER)}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
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
            </Box>
            <Box
              className={cn(styles.textAreaContainer, {
                [styles.inputIsError]: Boolean(message.fieldState.error),
              })}
            >
              <FormInput
                helperText={message.fieldState.error?.message}
                onChange={message.field.onChange}
                value={message.field.value ? message.field.value : ''}
                label='Введите ваше сообщение'
                isError={Boolean(message.fieldState.error)}
                textarea
                maxLength={1000}
              />
              <Typography
                className={cn(styles.footnote, {
                  [styles.footnoteErrorActive]: Boolean(
                    message.fieldState.error,
                  ),
                })}
              >
                максимальное количество символов 1000
              </Typography>
            </Box>
          </>
          <Button onClick={onSubmit} variant={'contained'}>
            Отправить
          </Button>
          <Typography
            className={styles.policy}
            id='modal-modal-title'
            component='p'
            mb={1}
          >
            Нажимая на кнопку «Отправить», вы даете согласие на обработку даных
            и соглашаетесь с{' '}
            <Link href='/policy'>политикой конфиденциальности.</Link>
          </Typography>
        </form>
      </Container>
    </ModalWrapper>
  );
};

export { ModalAdvice };
