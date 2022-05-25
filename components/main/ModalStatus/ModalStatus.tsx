import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box, Button } from '@mui/material';
import { TailSpin } from 'react-loader-spinner';

import { fetchStatusPayment, clearCart } from 'store/reducers/cart/actions';
import { ModalWrapper } from 'components/main/ModalWrapper';
import { selectStatus } from 'store/reducers/cart/selectors';
import colors from 'styles/_export.module.scss';
import { CookieKey } from 'constants/types';
import { cookieStorage } from 'utility/helpers';

import styles from './styles.module.scss';

const loaderColor = colors.blue;

const ModalStatus: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(true);

  const { orderId } = router.query;

  const { data, error, isLoading } = useSelector(selectStatus);
  const isError = Boolean(error);
  const isData = Boolean(data);

  const onCloseModalSuccess = () => {
    setIsOpenModal(false);
    router.push('/');
  };

  const onCloseModalFailure = () => {
    setIsOpenModal(false);
    router.push('/cart');
  };

  useEffect(() => {
    if (!orderId) {
      return;
    }

    dispatch(fetchStatusPayment({ orderId }));
  }, [dispatch, orderId]);

  useEffect(() => {
    if (!isData) {
      return;
    }

    cookieStorage.setItem(CookieKey.CARTITEMS, '');
    dispatch(clearCart());
  }, [isData, dispatch]);

  return (
    <ModalWrapper isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
      {isError ? (
        <Box component='div' className={styles.box}>
          <Typography className={styles.title}>Статус Заказа:</Typography>
          {isLoading ? (
            <TailSpin
              wrapperClass={styles.loader}
              height={60}
              width={60}
              color={loaderColor}
            />
          ) : (
            <Typography className={styles.detail}>Произошла ошибка</Typography>
          )}
          <Button className={styles.button} onClick={onCloseModalFailure}>
            Вернуться в корзину
          </Button>
        </Box>
      ) : (
        <Box component='div' className={styles.box}>
          <Typography className={styles.title}>Статус Заказа:</Typography>
          {isLoading ? (
            <TailSpin
              wrapperClass={styles.loader}
              height={60}
              width={60}
              color={loaderColor}
            />
          ) : (
            <Typography className={styles.detail}>{data?.detail}</Typography>
          )}
          <Button className={styles.button} onClick={onCloseModalSuccess}>
            Ok
          </Button>
        </Box>
      )}
    </ModalWrapper>
  );
};

export { ModalStatus };
