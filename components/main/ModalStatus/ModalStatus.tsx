import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Loader } from 'components/ui/Loader';
import {
  fetchStatusPaymentAuthorized,
  fetchStatusPaymentUnAuthorized,
  clearStatus,
} from 'store/reducers/payment/actions';
import { ModalWrapper } from 'components/main/ModalWrapper';
import {
  selectIsAuthorized,
  selectLoadingAuthorized,
} from 'store/reducers/authentication/selectors';
import { selectStatus } from 'store/reducers/payment/selectors';

import styles from './styles.module.scss';
import {
  clearCartAuthorized,
  clearCartUnAuthorized,
} from 'store/reducers/cart/actions';

const ModalStatus: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(true);

  const { orderId, payment_type } = router.query;

  const isAuthorized = useSelector(selectIsAuthorized);
  const isLoadingauthorized = useSelector(selectLoadingAuthorized);
  const { data, error, isLoading } = useSelector(selectStatus);
  const isError = Boolean(error);

  const onCloseModalSuccess = () => {
    setIsOpenModal(false);
    router.push('/');
  };

  const onCloseModalFailure = () => {
    setIsOpenModal(false);
    router.push('/cart');
  };

  useEffect(() => {
    if (!orderId || isLoadingauthorized) {
      return;
    }

    if (payment_type && isAuthorized) {
      dispatch(clearCartAuthorized());
      return;
    }

    if (payment_type) {
      dispatch(clearCartUnAuthorized());
      return;
    }

    if (isAuthorized) {
      dispatch(fetchStatusPaymentAuthorized({ orderId }));
      return;
    }

    dispatch(fetchStatusPaymentUnAuthorized({ orderId }));
  }, [dispatch, orderId, isLoadingauthorized, isAuthorized, payment_type]);

  useEffect(() => {
    return () => {
      dispatch(clearStatus());
    };
  }, [dispatch]);

  return (
    <ModalWrapper
      isOpen={isOpenModal}
      setIsOpen={setIsOpenModal}
      modalTitle='modal-status'
    >
      {isError ? (
        <Box component='div' className={styles.box}>
          <Typography className={styles.title}>Статус Заказа:</Typography>
          {isLoading ? (
            <Loader size={60} />
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
            <Loader size={60} />
          ) : (
            <>
              {payment_type ? (
                <Typography className={styles.detail}>
                  Заказ номер {orderId} принят в обработку
                </Typography>
              ) : (
                <Typography className={styles.detail}>
                  {data?.detail}
                </Typography>
              )}
            </>
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
