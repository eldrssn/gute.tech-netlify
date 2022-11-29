/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import {
  fetchPaymentMethods,
  clearCreateOrdering,
} from 'store/reducers/payment/actions';
import { selectCreateOrderingStatus } from 'store/reducers/payment/selectors';
import {
  selectOrder,
  selectOrderLoading,
} from 'store/reducers/order/selectors';
import { selectSelectedBranchId } from 'store/reducers/regions/selectors';
import { selectIsAuthorized } from 'store/reducers/authentication/selectors';
import { selectUserProfile } from 'store/reducers/user/selectors';
import {
  createOrderingUnAuthorized,
  createOrderingAuthorized,
} from 'store/reducers/payment/actions';

import { ContactInformation } from './components/ContactInformation';
import { PaymentMethod } from './components/PaymentMethod';
import { TFormData, PaymentType } from './types';
import {
  getOrderList,
  setPaymentFormErrors,
  getDefaultValues,
  getUrlCashPaymentType,
} from './helpers';
import styles from './styles.module.scss';

const PaymentPage: React.FC = () => {
  const [otherError, setOtherError] = useState<string[]>([]);

  const userProfile = useSelector(selectUserProfile);
  const selectedBranchId = useSelector(selectSelectedBranchId);

  const { handleSubmit, control, setValue, setError } = useForm<TFormData>({
    defaultValues: getDefaultValues(userProfile.data),
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const order = useSelector(selectOrder);
  const isLoadingOrder = useSelector(selectOrderLoading);
  const isAuthorized = useSelector(selectIsAuthorized);
  const createOrderStatus = useSelector(selectCreateOrderingStatus);

  const paymentUrl = createOrderStatus.data?.payment_url;
  const paymentId = createOrderStatus.data?.id;
  const paymentType = createOrderStatus.data?.payment_type;
  const createOrderLoading = createOrderStatus.loadingCreateOrdering;
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
      payment_method_id: data.paymentId,
      cart: orderList,
      branch_office_id: selectedBranchId,
    };
    setOtherError([]);

    if (createOrderLoading) {
      return;
    }

    if (isAuthorized) {
      dispatch(createOrderingAuthorized(postData));
      return;
    }

    dispatch(createOrderingUnAuthorized(postData));
  });

  useEffect(() => {
    dispatch(fetchPaymentMethods());
    dispatch(clearCreateOrdering());

    return () => {
      dispatch(clearCreateOrdering());
    };
  }, []);

  useEffect(() => {
    if (!isOrderList && !isLoadingOrder) {
      router.push('/cart');
    }
  }, [router, isOrderList, isLoadingOrder]);

  useEffect(() => {
    if (!isCreateOrdering) {
      return;
    }

    if (paymentType === PaymentType.CASH && paymentId) {
      router.push(getUrlCashPaymentType(paymentId));
    }

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
      <PaymentMethod control={control} setValue={setValue} />
      <ContactInformation control={control} />
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
