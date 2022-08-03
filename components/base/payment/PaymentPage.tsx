import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';

import {
  fetchPaymentMethods,
  clearCreateOrdering,
} from 'store/reducers/payment/actions';
import { removeItemBySlug } from 'store/reducers/cart/actions';
import { clearItemsSlugs } from 'store/reducers/order/actions';
import { selectCreateOrderingStatus } from 'store/reducers/payment/selectors';
import {
  selectOrder,
  selectOrderLoading,
  selectOrderItemsSlugs,
} from 'store/reducers/order/selectors';
import { selectIsAuthorized } from 'store/reducers/authentication/selectors';
import {
  createOrderingUnAuthorized,
  createOrderingAuthorized,
} from 'store/reducers/payment/actions';

import { DeliveryAddress } from './components/DeliveryAddress';
import { ContactInformation } from './components/ContactInformation';
import { PaymentMethod } from './components/PaymentMethod';
import { TFormData } from './types';
import { getOrderList, setPaymentFormErrors } from './helpers';
import styles from './styles.module.scss';

const PaymentPage: React.FC = () => {
  const [otherError, setOtherError] = useState<string[]>([]);
  const { handleSubmit, control, setValue, setError } = useForm<TFormData>({
    defaultValues: {
      paymentMethod: 'CARD',
      paymentGateway: 'SBERBANK',
      phoneNumber: '',
      nameValue: '',
      emailValue: '',
      branch: null,
      branchesData: null,
    },
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const order = useSelector(selectOrder);
  const isLoadingOrder = useSelector(selectOrderLoading);
  const isAuthorized = useSelector(selectIsAuthorized);
  const createOrderStatus = useSelector(selectCreateOrderingStatus);
  const orderItemsSlugs = useSelector(selectOrderItemsSlugs);

  const paymentUrl = createOrderStatus.data?.payment_url;
  const isCreateOrdering = createOrderStatus.isCreateOrdering;
  const errors = createOrderStatus.errorCreateOrdering?.errors;
  const isOrderList = order.length > 0;

  const onSubmit = handleSubmit((data) => {
    const orderList = getOrderList(order);
    const postData = {
      name: data.nameValue,
      phone: data.phoneNumber,
      email: data.emailValue,
      payment_type: data.paymentMethod,
      gateway: data.paymentGateway,
      cart: orderList,
      branch_office_id: data.branch ? data.branch.id : 0,
    };
    setOtherError([]);
    dispatch(clearItemsSlugs());
    dispatch(removeItemBySlug(orderItemsSlugs));

    if (isAuthorized) {
      dispatch(createOrderingAuthorized(postData));
      return;
    }

    dispatch(createOrderingUnAuthorized(postData));
  });

  useEffect(() => {
    dispatch(fetchPaymentMethods());
    dispatch(clearCreateOrdering());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isOrderList && !isLoadingOrder) {
      router.push('/cart');
    }
  }, [router, isOrderList, isLoadingOrder]);

  useEffect(() => {
    if (paymentUrl) {
      window.location.href = paymentUrl;
    }
  }, [isCreateOrdering, paymentUrl]);

  useEffect(() => {
    if (!errors) {
      setOtherError([]);
      return;
    }

    setPaymentFormErrors({ setError, errors, setOtherError });
  }, [errors, setError]);

  const isOtherError = otherError.length > 0;

  return (
    <form onSubmit={onSubmit} className={styles.main}>
      <Typography
        className={styles.mainTitle}
        id='modal-modal-title'
        variant='h6'
        component='h2'
        mb={1}
      >
        Оформление заказа
      </Typography>
      <PaymentMethod control={control} />
      <ContactInformation control={control} />
      <DeliveryAddress control={control} setValue={setValue} />
      <Button sx={{ mt: '20px' }} onClick={onSubmit} variant={'contained'}>
        Заказать
      </Button>
      {isOtherError && (
        <>
          {otherError.map((error) => (
            <Typography key={error} className={styles.otherErrorMessage}>
              {error}
            </Typography>
          ))}
        </>
      )}
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

export { PaymentPage };
