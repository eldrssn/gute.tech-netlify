import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, FormControl, Button } from '@mui/material';

import { setActiveAuthorizationForm } from 'store/reducers/authentication/actions';

import { ActiveAutorizationFormKey } from 'constants/types';

import styles from '../../styles.module.scss';

const FormResetPasswordSuccess: FC = () => {
  const dispatch = useDispatch();

  return (
    <FormControl>
      <Typography className={styles.formTitle}>Сброс пароля</Typography>
      <Typography className={styles.formText}>
        Пароль успешно изменен
      </Typography>
      <Button
        onClick={() => {
          dispatch(
            setActiveAuthorizationForm(ActiveAutorizationFormKey.AUTHORIZATION),
          );
        }}
        variant={'contained'}
        className={styles.formButton}
      >
        Вернуться к авторизации
      </Button>
    </FormControl>
  );
};

export { FormResetPasswordSuccess };
