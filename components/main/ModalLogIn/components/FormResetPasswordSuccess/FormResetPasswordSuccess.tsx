import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Typography } from '@mui/material';

import { setActiveAuthorizationForm } from 'store/reducers/authentication/actions';

import { ActiveAutorizationFormKey } from 'constants/types';

import styles from '../../styles.module.scss';

const FormResetPasswordSuccess: FC = () => {
  const dispatch = useDispatch();

  const handleClickBackToMain = () => {
    dispatch(
      setActiveAuthorizationForm(ActiveAutorizationFormKey.AUTHORIZATION),
    );
  };

  return (
    <form>
      <Typography className={styles.formTitle}>Сброс пароля</Typography>
      <Typography className={styles.formText}>
        Пароль успешно изменен
      </Typography>
      <button onClick={handleClickBackToMain} className={styles.formButton}>
        Вернуться к авторизации
      </button>
    </form>
  );
};

export { FormResetPasswordSuccess };
