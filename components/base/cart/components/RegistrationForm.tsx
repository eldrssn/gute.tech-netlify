import { useForm, useController } from 'react-hook-form';
import { Typography, Box, Button } from '@mui/material';
import Link from 'next/link';

import FormInput from 'components/main/FormInput';
import { getInputRules } from 'utility/helpers';
import { EValidatePattern } from 'constants/types';

import { TFormData } from '../types';
import styles from './RegistrationForm.module.css';

const RegistrationForm: React.FC = () => {
  const { handleSubmit, control } = useForm<TFormData>();
  const phoneInput = useController({
    name: 'phoneNumber',
    control,
    rules: getInputRules(EValidatePattern.PHONE_NUMBER),
  });
  const nameInput = useController({
    name: 'nameValue',
    control,
    rules: getInputRules(),
  });
  const emailInput = useController({
    name: 'emailValue',
    control,
    rules: getInputRules(EValidatePattern.EMAIL),
  });

  //TODO: Обработка запроса

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <Typography
        className={styles.formTitle}
        id='modal-modal-title'
        variant='h6'
        component='h2'
        mb={1}
      >
        Оформление заказа
      </Typography>
      <Box className={styles.inputContainer}>
        <FormInput
          helperText={nameInput.fieldState.error?.message}
          onChange={nameInput.field.onChange}
          value={nameInput.field.value}
          label='Ваше имя'
          isError={Boolean(nameInput.fieldState.error)}
        />
      </Box>
      <Box className={styles.inputContainer}>
        <FormInput
          helperText={phoneInput.fieldState.error?.message}
          onChange={phoneInput.field.onChange}
          value={phoneInput.field.value}
          label='Телефон'
          isError={Boolean(phoneInput.fieldState.error)}
        />
      </Box>
      <Box className={styles.inputContainer}>
        <FormInput
          helperText={emailInput.fieldState.error?.message}
          onChange={emailInput.field.onChange}
          value={emailInput.field.value}
          label='Email'
          isError={Boolean(emailInput.fieldState.error)}
        />
      </Box>
      <Button sx={{ mt: '20px' }} onClick={onSubmit} variant={'contained'}>
        Заказать
      </Button>
      <Typography
        className={styles.policy}
        id='modal-modal-title'
        component='p'
        mb={1}
      >
        Нажимая на кнопку «Заказать», вы даете согласие на обработку даных и
        соглашаетесь с <Link href='/policy'>политикой конфиденциальности.</Link>
      </Typography>
    </form>
  );
};

export default RegistrationForm;
